import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { Like, Repository } from 'typeorm'
import { PageListDto, PageQueryDto } from 'src/common/dto'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  add(createDto: CreateUserDto) {
    let data = Object.assign(new User(), createDto)
    return this.usersRepository.save(data)
  }

  findList(query): Promise<User[]> {
    let { deptId, name, roleId } = query
    return this.usersRepository.find({ where: [{ deptId, name: Like(`%${name}%`) }] })
  }

  async pageList(query: PageQueryDto): Promise<PageListDto<User>> {
    // let where = [{ id: query.id }]
    // let total = await this.usersRepository.count({ where })
    let [data, total] = await this.usersRepository.findAndCount({
      where: [{ deptId: query.deptId }],
      skip: --query.pageNum * query.pageSize,
      take: query.pageSize,
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

  update(updateUserDto: User) {
    return this.usersRepository.update(updateUserDto.id, updateUserDto)
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
