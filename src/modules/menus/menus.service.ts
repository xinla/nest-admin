import { Injectable } from '@nestjs/common'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { Menu } from './menu.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Like, Repository, TreeRepository } from 'typeorm'
import { BaseService } from 'src/common/BaseService'
import { arrayToTree } from 'src/common/utils/common'

@Injectable()
export class MenusService extends BaseService<Menu, CreateMenuDto> {
  constructor(
    @InjectRepository(Menu)
    repository: Repository<Menu>,
    @InjectRepository(Menu)
    private treeRepository: TreeRepository<Menu>,
  ) {
    super(Menu, repository)
  }

  async save(createDto: CreateMenuDto) {
    let data = new Menu().assignOwn(createDto)
    if (data.parentId && data.parentId != '0') {
      data.parent = Object.assign(new Menu(), { id: data.parentId })
    } else {
      delete data.parentId
    }
    return await this.repository.save(data)
  }

  async list(query, isTree = true): Promise<Menu[]> {
    let { isActive, name, type } = query
    let queryOrm: FindManyOptions = {
      where: [{ isActive, type, name: (name &&= Like(`%${name}%`)) }],
    }

    let data = await this.treeRepository.find(queryOrm)
    // let trees = arrayToTree(data)
    return isTree ? arrayToTree(data) : data
  }

  async getTrees(query): Promise<Menu[]> {
    return this.treeRepository.findTrees()
  }
}
