import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Like, Repository, UpdateResult } from 'typeorm'
import { Role } from './entity'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { BaseService } from 'src/common/BaseService'
import { Menu } from '../menus/menu.entity'

@Injectable()
export class RolesService extends BaseService<Role, CreateRoleDto> {
  constructor(
    @InjectRepository(Role)
    repository: Repository<Role>,
  ) {
    super(Role, repository)
  }

  async save(createDto) {
    createDto.menus = createDto.menuIds?.map((id) => Object.assign(new Menu(), { id }))
    return this.repository.save(new Role().assignOwn(createDto))
  }

  // async update(updateDto: Role): Promise<UpdateResult> {
  //   let data = Object.assign(new Role(), updateDto)
  //   return this.repository.update(data.id, data)
  // }

  async list(query: QueryListDto): Promise<ResponseListDto<Role>> {
    let { pageNum, pageSize, name, key, isActive } = query
    let queryOrm: FindManyOptions = {
      where: [{ isActive, name: (name &&= Like(`%${name}%`)) }, { key: (key &&= Like(`%${key}%`)) }],
      relations: {
        users: true,
        menus: true,
      },
    }
    pageNum && pageSize && ((queryOrm.skip = --pageNum * pageSize), (queryOrm.take = pageSize))

    let [data, total] = await this.repository.findAndCount(queryOrm)
    return { total: total, data: data, _flag: true }
  }

  async getOne(id: string): Promise<Role | null> {
    return this.repository.findOneBy({ id })
  }
}
