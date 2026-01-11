import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req, HttpCode } from '@nestjs/common'
import { SystemLogService } from './service'
import { BaseController } from 'src/common/BaseController'

@Controller('system/systemLog')
export class SystemLogController extends BaseController<{}, SystemLogService> {
  constructor(readonly service: SystemLogService) {
    super(service)
  }

  /**
   * 读取 app.log 文件日志
   * @param query
   * @returns
   */
  @Get()
  async get(@Query() query) {
    return await this.service.get()
  }

  @Delete()
  async del(@Query() query) {
    return await this.service.del()
  }
}
