import { Injectable } from '@nestjs/common'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { Menu } from './entities/menu.entity'

@Injectable()
export class MenusService {
  create(createMenuDto: Menu) {
    return 'This action adds a new menu'
  }

  findAll(query) {
    return `This action returns all menus`
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`
  }

  remove(id: number) {
    return `This action removes a #${id} menu`
  }
}
