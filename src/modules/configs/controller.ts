import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req } from '@nestjs/common'
import { SystenConfigsService } from './service'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { UpdateResult } from 'typeorm'
import { SystenConfig } from './entity'
import { BaseController } from 'src/common/BaseController'

@Controller('system/configs')
export class SystenConfigsController extends BaseController<SystenConfig, SystenConfigsService> {
  constructor(readonly service: SystenConfigsService) {
    super(service)
  }
}
