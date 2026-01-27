import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req } from '@nestjs/common'
import { RolesService } from './service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { UpdateResult } from 'typeorm'
import { Role } from './entity'
import { BaseController } from 'src/common/BaseController'
import { MenuType } from '../menus/menu.entity'
import { arrayToTree } from 'src/common/utils/common'

// 用户角色
@Controller('system/roles')
export class RolesController extends BaseController<Role, RolesService> {
  constructor(readonly service: RolesService) {
    super(service)
  }

  @Get('getLoginUserMenus')
  async getUserMenus(@Req() req): Promise<{}[]> {
    let res = await this.service.getUserMenus(req.user)
    res = res.filter((item) => item.type !== MenuType.button)
    return arrayToTree(res)
  }
}
