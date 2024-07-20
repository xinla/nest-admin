import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req } from '@nestjs/common'
import { DeptService } from './depts.service'
import { CreateDeptDto } from './dto/create-dept.dto'
import { UpdateDeptDto } from './dto/update-dept.dto'
import { Dept } from './entities/dept.entity'
import { UpdateResult } from 'typeorm'
import { PageQueryDto, PageListDto } from 'src/common/dto'

@Controller('system/dept')
export class DeptController {
  constructor(private readonly service: DeptService) {}

  @Post('create')
  create(@Body() createDto: Dept): Promise<Dept> {
    return this.service.create(createDto)
  }

  @Put('update')
  update(@Body() updateDto: Dept): Promise<UpdateResult> {
    return this.service.update(updateDto)
  }

  @Get('find')
  find(@Query() query): Promise<Dept[]> {
    return this.service.find(query)
  }

  @Get('pageList')
  pageList(@Query() query: PageQueryDto): Promise<PageListDto<Dept>> {
    return this.service.pageList(query)
  }

  @Get('detail')
  findOne(@Query('id') id: string): Promise<Dept> {
    return this.service.findOne(id)
  }

  @Delete('del/:id')
  softDelete(@Param('id') id: string) {
    return this.service.softDelete(id)
  }
}
