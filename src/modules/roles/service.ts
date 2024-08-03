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

  async add(createDto): Promise<Boolean> {
    let data = Object.assign(new Role(), createDto)
    try {
      await this.repository.save(data)
      return true
    } catch (error) {
      // code =
      // 'ER_DUP_ENTRY'
      // errno =
      // 1062
      // message =
      // "Duplicate entry 'ad' for key 'sys_role.IDX_8450ef8b1055587abeb8561542'"
      // sqlState =
      // '23000'
      if (error.code == 'ER_DUP_ENTRY') {
        let match = error.message.match(/Duplicate entry '(.+)' for/)
        throw new Error(`角色${match[1]}已存在`)
      }
    }
  }

  async update(updateDto: Role): Promise<UpdateResult> {
    let data = Object.assign(new Role(), updateDto)
    return this.repository.update(data.id, data)
  }

  async del(id: string[] | string): Promise<UpdateResult> {
    if (typeof id == 'string') {
      id = id.split(',')
    }
    return this.repository.softDelete(id)
  }

  async list(query: QueryListDto): Promise<ResponseListDto<Role>> {
    let { pageNum, pageSize, name } = query
    let queryOrm: FindManyOptions = {
      where: [{ name: (name &&= Like(`%${name}%`)) }],
    }
    pageNum && pageSize && ((queryOrm.skip = --pageNum * pageSize), (queryOrm.take = pageSize))

    let [data, total] = await this.repository.findAndCount(queryOrm)
    return { total: total, data: data, _flag: true }
  }

  async getOne(id: string): Promise<Role | null> {
    return this.repository.findOneBy({ id })
  }
}
