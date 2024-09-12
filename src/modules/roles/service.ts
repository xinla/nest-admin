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

  async list(query: QueryListDto): Promise<ResponseListDto<Role>> {
    let { name, permissionKey, isActive } = query
    let queryOrm: FindManyOptions = {
      where: { isActive, name: this.sqlLike(name), permissionKey: this.sqlLike(permissionKey) },
      relations: {
        users: true,
        menus: true,
      },
    }
    return this.listBy(queryOrm, query)
  }
}
