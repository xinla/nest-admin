import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req, HttpCode } from '@nestjs/common'
import { SystenConfigsService } from './service'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { UpdateResult } from 'typeorm'
import { SystenConfig } from './entity'
import { BaseController } from 'src/common/BaseController'
import { Public } from '../auth/auth.service'

@Controller('system/configs')
export class SystenConfigsController extends BaseController<SystenConfig, SystenConfigsService> {
  constructor(readonly service: SystenConfigsService) {
    super(service)
  }

  @Get('list')
  @Public()
  async list(@Query() query: QueryListDto) {
    query.pageNum ??= 1
    query.pageSize ??= 10
    return this.service.list(query)
  }

  @HttpCode(404)
  @Delete('del/:ids')
  async del() {}
}
