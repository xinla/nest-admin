import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { MenuService } from './menu.service'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { PageListDto, PageQueryDto } from 'src/common/dto'
import { Menu, MenuType, menuTypes } from './entities/menu.entity'

@Controller('system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() Menu: Menu) {
    return this.menuService.create(Menu)
  }

  @Get()
  findAll(@Query() query): Promise<Menu[]> {
    return this.menuService.findAll(query)
  }

  @Get('types')
  types() {
    return menuTypes
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id)
  }
}
