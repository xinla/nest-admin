import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Like, Repository, UpdateResult } from 'typeorm'
import { Role } from './entity'
import { QueryListDto, ResponseListDto } from 'src/common/dto'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) {}

  async save(createDto): Promise<Boolean> {
    let data = Object.assign(new Role(), createDto)
    await this.repository.save(data)
    return true
  }

  // async update(updateDto: Role): Promise<UpdateResult> {
  //   let data = Object.assign(new Role(), updateDto)
  //   return this.repository.update(data.id, data)
  // }

  async del(id: string[] | string): Promise<UpdateResult> {
    if (typeof id == 'string') {
      id = id.split(',')
    }
    return this.repository.softDelete(id)
  }

  async list(query: QueryListDto): Promise<ResponseListDto<Role>> {
    let { pageNum, pageSize, name, key, isActive } = query
    let queryOrm: FindManyOptions = {
      where: [{ isActive, name: (name &&= Like(`%${name}%`)) }, { key: (key &&= Like(`%${key}%`)) }],
    }
    pageNum && pageSize && ((queryOrm.skip = --pageNum * pageSize), (queryOrm.take = pageSize))

    let [data, total] = await this.repository.findAndCount(queryOrm)
    return { total: total, data: data, _flag: true }
  }

  async getOne(id: string): Promise<Role | null> {
    return this.repository.findOneBy({ id })
  }
}
