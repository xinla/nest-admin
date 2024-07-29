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

  @Post('add')
  create(@Body() createDto: Dept): Promise<Dept> {
    return this.service.add(createDto)
  }

  @Put('update')
  update(@Body() updateDto: Dept): Promise<UpdateResult> {
    return this.service.update(updateDto)
  }

  @Get('findTree')
  findTree(@Query() query): Promise<Dept[]> {
    return this.service.findTree(query)
  }

  @Get('findList')
  findList(@Query() query): Promise<Dept[]> {
    return this.service.findList(query)
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
