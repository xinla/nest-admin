import { Injectable } from '@nestjs/common'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { Menu } from './menu.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Like, Repository, TreeRepository } from 'typeorm'
import { BaseService } from 'src/common/BaseService'
import { arrayToTree } from 'src/common/utils/common'
import { QueryListDto } from 'src/common/dto'

@Injectable()
export class MenusService extends BaseService<Menu, CreateMenuDto> {
  constructor(
    @InjectRepository(Menu)
    repository: TreeRepository<Menu>,
  ) {
    super(Menu, repository)
  }

  async save(createDto: CreateMenuDto) {
    let data = new Menu(createDto)
    if (data.parentId && data.parentId != '0') {
      data.parent = Object.assign(new Menu(), { id: data.parentId })
    } else {
      delete data.parentId
    }
    return await super.save(data)
  }

  async list(query: QueryListDto = {}, isTree = true) {
    let { isActive, name, type } = query
    let queryOrm: FindManyOptions = {
      where: { isActive, type, name: this.sqlLike(name) },
    }

    let data = await this.repository.find(queryOrm)
    // let trees = arrayToTree(data)
    return isTree ? arrayToTree(data) : data
  }

  async getTrees(query): Promise<Menu[]> {
    return this.repository.findTrees()
  }
}
