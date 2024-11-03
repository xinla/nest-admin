import { Controller, Get, Post, Body, Param, Delete, Query, Req, Sse, Res, Header, HttpStatus } from '@nestjs/common'
import { AiService } from './service'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { UpdateResult } from 'typeorm'
import { Ai } from './entity'
import { BaseController } from 'src/common/BaseController'
import { Public } from 'src/modules/auth/auth.service'
import { Observable, fromEvent, interval, map } from 'rxjs'
import { Response } from 'express'
import { Readable } from 'stream'
import { uuid } from 'src/common/utils/common'
import { BoolNum } from 'src/common/type/base'

@Controller('ai/chat')
export class AiController extends BaseController<Ai, AiService> {
  constructor(readonly service: AiService) {
    super(service)
  }

  @Get('list')
  list(@Query() query, @Req() req) {
    query.userId ??= req.user.id
    return super.list(query)
  }

  @Post('create')
  create(@Body() body) {
    return this.service.create(body)
  }

  @Public()
  // @Get('send')
  // @Header('Content-Type', 'text/event-stream')
  // @Header('Cache-Control', 'no-cache')
  // @Header('Connection', 'keep-alive')
  async send(@Res() res: Response, @Query() body) {
    console.log('body', body)
    res.set('Content-Type', 'text/event-stream')
    res.set('Cache-Control', 'no-cache')
    res.set('Connection', 'keep-alive')
    let mes = await this.service.send(body)
    mes.stream.pipe(res)

    // const eventSource = fromEvent(mes, 'message').pipe()

    // // 当客户端关闭连接时，取消订阅
    // res.on('close', () => {
    //   // eventSource.unsubscribe()
    //   res.end()
    // })
    // 创建可读流
    // const stream = new Readable({
    //   read() {
    //     setInterval(() => {
    //       this.push(`data: ${new Date().toISOString()}\n\n`)
    //     }, 1000)
    //   },
    // })

    // // 使用 pipe 方法将数据流传输到响应对象
    // stream.pipe(res)

    // res.write('data: Hello, world!\n\n')
    // setInterval(() => {
    //   map((_) => ({ data: { hello: 'world' } }))
    // }, 1000)
  }

  @Post('send')
  @Sse()
  async sse(@Body() body, @Req() req) {
    if (!body.sessionId) {
      body.sessionId = uuid()
    }
    body.userId ??= req.user.id
    body.question ??= body.content
    let { id }: any = await super.save(body, req)
    let mes = await this.service.send(body)
    let answer = ''
    const ob$ = new Observable((subscriber) => {
      mes.on('message', (message) => {
        let data = JSON.parse(message.data)
        data.sessionId = body.sessionId
        data.id = id
        // data.c = undefined // undefined 会被剔除
        answer = answer + data.Choices?.[0]?.Delta?.Content
        subscriber.next(data)
        if (data.Choices?.[0]?.FinishReason === 'stop') {
          subscriber.complete()
          // sessionId在回答完成后保存，避免未完成被检索出来
          super.save({ id, isSession: BoolNum.Yes, answer }, req)
        }
      })
    })
    return ob$
  }

  @Post('collect')
  collect(@Body() body, @Req() req) {
    return super.save(body, req)
  }
}
