import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common'
import { QueryListDto, ResponseListDto } from './dto'

export class BaseController<T, K> {
  service = null
  constructor(service: K) {
    this.service = service
  }

  // add Or Update
  @Post('save')
  async save(@Body() body, @Req() req) {
    if (body.id) {
      delete body.createUser
      body.updateUser = req.user.name
    } else {
      delete body.updateUser
      body.createUser = req.user.name
    }
    return this.service.save(body)
  }

  @Post('add')
  async add(@Body() body, @Req() req) {
    delete body.updateUser
    body.createUser = req.user.name
    return this.service.add(body)
  }

  @Post('update')
  async update(@Body() body, @Req() req) {
    delete body.createUser
    body.updateUser = req.user.name
    return this.service.update(body)
  }

  /**
   * 删除
   * @param ids id主键 多个用’,’分割，eg: '1,2,3'
   */
  @Delete('del/:ids')
  async del(@Param('ids') ids: string, @Req() req) {
    return this.service.del(ids, req.user.name)
  }

  // 分页查询
  @Get('list')
  // @Get('pageList')
  async list(@Query() query: QueryListDto, @Req() req?): Promise<ResponseListDto<T> | T[]> {
    query.pageNum ??= 1
    query.pageSize ??= 10
    return this.service.list(query)
  }

  // 查询全部，返回所有结果
  // @Get('listAll')
  // async listAll(@Query() query: QueryListDto): Promise<ResponseListDto<T>> {
  //   return this.service.list(query)
  // }

  // 单个查询，获取详情
  @Get('getOne/:id')
  async getOne(@Param('id') id: string): Promise<T> {
    return this.service.getOne({ id })
  }
}
