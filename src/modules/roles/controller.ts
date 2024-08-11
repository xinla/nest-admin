import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req } from '@nestjs/common'
import { RolesService } from './service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { UpdateResult } from 'typeorm'
import { Role } from './entity'
import { BaseController } from 'src/common/BaseController'

// 用户角色
@Controller('system/roles')
export class RolesController extends BaseController<Role, RolesService> {
  constructor(readonly service: RolesService) {
    super(service)
  }
}
