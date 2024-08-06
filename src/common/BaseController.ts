import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { QueryListDto, ResponseListDto } from './dto'

export class BaseController<T, K> {
  service = null
  constructor(service: K) {
    this.service = service
  }

  // add Or Update
  @Post('save')
  async save(@Body() createDto) {
    return this.service.save(createDto)
  }

  @Delete('del/:id')
  async del(@Param('id') id: string[]) {
    return this.service.del(id)
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
