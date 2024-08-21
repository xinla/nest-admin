import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req } from '@nestjs/common'
import { LoginLogsService } from './service'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { UpdateResult } from 'typeorm'
import { LoginLog } from './entity'
import { BaseController } from 'src/common/BaseController'

@Controller('system/loginLogs')
export class LoginLogsController extends BaseController<LoginLog, LoginLogsService> {
  constructor(readonly service: LoginLogsService) {
    super(service)
  }
  @Post('save')
  async save() {}
}
