import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req } from '@nestjs/common'
import { RolesService } from './service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { UpdateResult } from 'typeorm'
import { Role } from './entity'

// 用户角色
@Controller('system/roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Post('add')
  async add(@Body() createDto): Promise<Boolean> {
    return this.service.add(createDto)
  }

  @Put('update')
  async update(@Body() updateUserDto): Promise<UpdateResult> {
    return this.service.update(updateUserDto)
  }

  @Delete('del/:id')
  async del(@Param('id') id: string[]): Promise<UpdateResult> {
    return this.service.del(id)
  }

  @Get('list')
  async list(@Query() query: QueryListDto): Promise<ResponseListDto<Role>> {
    return this.service.list(query)
  }

  @Get('getOne')
  async getOne(@Query('id') id: string): Promise<Role> {
    return this.service.getOne(id)
  }
}
