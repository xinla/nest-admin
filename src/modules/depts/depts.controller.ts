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
  async add(@Body() createDto: Dept): Promise<Dept> {
    return this.service.add(createDto)
  }

  @Put('update')
  async update(@Body() updateDto: Dept): Promise<UpdateResult> {
    return this.service.update(updateDto)
  }

  @Delete('del/:id')
  async del(@Param('id') id: string) {
    return this.service.del(id)
  }

  @Get('findTree')
  findTree(@Query() query): Promise<Dept[]> {
    return this.service.findTree(query)
  }

  @Get('list')
  async list(@Query() query): Promise<Dept[]> {
    return this.service.list(query)
  }
}
