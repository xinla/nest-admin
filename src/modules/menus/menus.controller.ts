import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { PageListDto, PageQueryDto } from 'src/common/dto'
import { Menu, MenuType, menuTypes } from './entities/menu.entity'

@Controller('system/menu')
export class MenuController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  create(@Body() Menu: Menu) {
    return this.menusService.create(Menu)
  }

  @Get()
  findAll(@Query() query): Promise<Menu[]> {
    return this.menusService.findAll(query)
  }

  @Get('types')
  types() {
    return menuTypes
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(+id, updateMenuDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id)
  }
}
