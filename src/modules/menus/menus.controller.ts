import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { MenusService } from './menus.service'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { PageListDto, PageQueryDto } from 'src/common/dto'
import { Menu, MenuType, menuTypes } from './menu.entity'
import { BaseController } from 'src/common/BaseController'

@Controller('system/menus')
export class MenusController extends BaseController<Menu, MenusService> {
  constructor(service: MenusService) {
    super(service)
  }

  @Get('getTrees')
  getTrees(@Query() query): Promise<Menu[]> {
    return this.service.list(query)
  }

  @Get('getTypes')
  getTypes() {
    return menuTypes
  }
}
