import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common'
import { QueryListDto, ResponseListDto } from './dto'

export class BaseController<T, K> {
  service = null
  constructor(service: K) {
    this.service = service
  }

  // add Or Update
  @Post('save')
  async save(@Body() createDto, @Req() req) {
    if (createDto.id) {
      delete createDto.createUser
      createDto.updateUser = req.user.name
    } else {
      delete createDto.updateUser
      createDto.createUser = req.user.name
    }
    return this.service.save(createDto)
  }

  @Delete('del/:ids')
  async del(@Param('ids') ids: string, @Req() req) {
    return this.service.del(ids, req.user.name)
  }

  @Get('list')
  async list(@Query() query: QueryListDto): Promise<ResponseListDto<T>> {
    return this.service.list(query)
  }

  @Get('getOne')
  async getOne(@Param('id') id: string): Promise<T> {
    return this.service.getOne({ id })
  }
}
