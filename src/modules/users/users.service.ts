import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { Like, Repository } from 'typeorm'
import { ListDto, QueryDto } from 'src/common/dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Dept } from '../depts/entities/dept.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  add(createDto: CreateUserDto) {
    // let dept = Object.assign(new Dept(), { id: createDto.deptId })
    let data = Object.assign(new User(), createDto)
    // data.dept = dept
    return this.usersRepository.save(data)
  }

  async list(query: QueryDto): Promise<ListDto<User>> {
    // let total = await this.usersRepository.count({ where })
    let { pageNum, pageSize, deptId, name, roleId } = query
    let [data, total] = await this.usersRepository.findAndCount({
      where: [{ deptId: deptId == 0 ? undefined : deptId, name: (name &&= Like(`%${name}%`)) }],
      skip: --pageNum * pageSize,
      take: pageSize,
      relations: {
        dept: true,
      },
    })
    return {
      total: total,
      data: data,
      _flag: true,
    }
  }

  findOne(user): Promise<User | null> {
    return this.usersRepository.findOneBy(user)
  }

  update(updateDto: User) {
    let data = Object.assign(new User(), updateDto)
    return this.usersRepository.update(data.id, data)
  }

  async softDelete(id: string[] | string): Promise<void> {
    if (typeof id == 'string') {
      id = id.split(',')
    }
    await this.usersRepository.softDelete(id)
  }

  // async delete(id: string): Promise<void> {
  //   await this.usersRepository.delete(id)
  // }
}
