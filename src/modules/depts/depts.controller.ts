import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req } from '@nestjs/common'
import { DeptService } from './depts.service'
import { CreateDeptDto } from './dto/create-dept.dto'
import { UpdateDeptDto } from './dto/update-dept.dto'
import { Dept } from './entities/dept.entity'
import { UpdateResult } from 'typeorm'
import { BaseController } from 'src/common/BaseController'

@Controller('system/dept')
export class DeptController extends BaseController<Dept, DeptService> {
  constructor(readonly service: DeptService) {
    super(service)
  }

  @Get('getTrees')
  getTrees(@Query() query) {
    return this.service.getTrees(query)
  }
}
