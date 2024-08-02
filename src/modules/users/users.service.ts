import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { FindManyOptions, Like, Repository, UpdateResult } from 'typeorm'
import { ResponseListDto, QueryListDto } from 'src/common/dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Dept } from '../depts/entities/dept.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 添加
  async add(createDto: CreateUserDto) {
    // let dept = Object.assign(new Dept(), { id: createDto.deptId })
    let data = Object.assign(new User(), createDto)
    // data.dept = dept
    return this.usersRepository.save(data)
  }

  async update(updateDto: User): Promise<UpdateResult> {
    let data = Object.assign(new User(), updateDto)
    return this.usersRepository.update(data.id, data)
  }

  async del(id: string[] | string): Promise<UpdateResult> {
    if (typeof id == 'string') {
      id = id.split(',')
    }
    return this.usersRepository.softDelete(id)
  }

  // 列表
  async list(query: QueryListDto): Promise<ResponseListDto<User>> {
    // let total = await this.usersRepository.count({ where })
    let { pageNum, pageSize, deptId, name, roleId } = query
    let queryOrm: FindManyOptions = {
      where: [{ deptId: deptId == 0 ? undefined : deptId, name: (name &&= Like(`%${name}%`)) }],
      relations: {
        dept: true,
      },
    }
    pageNum && pageSize && ((queryOrm.skip = --pageNum * pageSize), (queryOrm.take = pageSize))

    let [data, total] = await this.usersRepository.findAndCount(queryOrm)
    return { total: total, data: data, _flag: true }
  }

  async getOne(id): Promise<User | null> {
    return this.usersRepository.findOneBy({ id })
  }

  // async delete(id: string): Promise<void> {
  //   await this.usersRepository.delete(id)
  // }
}
