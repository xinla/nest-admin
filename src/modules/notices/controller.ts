import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req } from '@nestjs/common'
import { NoticesService } from './service'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { UpdateResult } from 'typeorm'
import { Notice } from './entity'
import { BaseController } from 'src/common/BaseController'

// 用户角色
@Controller('system/notices')
export class NoticesController extends BaseController<Notice, NoticesService> {
  constructor(readonly service: NoticesService) {
    super(service)
  }
}
