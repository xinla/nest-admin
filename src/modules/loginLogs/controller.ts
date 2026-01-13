import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req, HttpCode } from '@nestjs/common'
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

  // 重写以避免暴露路由
  @Post('save')
  @HttpCode(404)
  async save() {}

  /**
   * 用户访问量折线图
   * @param query { beginTime; endTime }
   * @returns
   */
  @Get('getVisitedNumChart')
  async getVisitedNumChart(@Query() query: { beginTime; endTime }) {
    return await this.service.getVisitedNumChart(query)
  }

  /**
   * 用户地区列表
   * @param query { beginTime; endTime }
   * @returns
   */
  @Get('getUserAreaList')
  async getUserAreaList(@Query() query: { beginTime; endTime }) {
    return await this.service.getUserAreaList(query)
  }
}
