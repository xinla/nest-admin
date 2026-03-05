import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req } from '@nestjs/common'
import { QueryListDto, ResponseListDto } from './dto'

// 控制器基类
export class BaseController<T, K> {
  service = null
  constructor(service: K) {
    this.service = service
  }

  // add Or Update
  @Post('save')
  async save(@Body() body, @Req() req) {
    if (body.id) {
      body.updateUser = req.user.name
    } else {
      body.createUser = req.user.name
      body.createUserId = req.user.id
    }
    body._userId ??= req?.user?.id
    return this.service.save(body)
  }

  // 新增
  @Post('add')
  async add(@Body() body, @Req() req) {
    body.createUser = req.user.name
    body.createUserId = req.user.id
    body._userId ??= req?.user?.id
    return this.service.add(body)
  }

  // 编辑 更新
  @Put('update')
  async update(@Body() body, @Req() req) {
    body.updateUser = req.user.name
    body._userId ??= req?.user?.id
    return this.service.update(body)
  }

  /**
   * 删除
   * @param ids id主键 多个用’,’分割，eg: '1,2,3'
   */
  @Delete('del/:ids')
  async del(@Param('ids') ids: string, @Req() req) {
    return this.service.del(ids, { updateUser: req.user.name, _userId: req?.user?.id })
  }

  // 分页查询
  @Get('list')
  // @Get('pageList')
  async list(@Query() query: QueryListDto, @Req() req?): Promise<ResponseListDto<T> | T[]> {
    query.pageNum ??= 1
    query.pageSize ??= 10
    query._userId ??= req?.user?.id
    // query._isDataPermission = true
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
