import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { PageListDto, PageQueryDto } from 'src/common/dto'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async pageList(query: PageQueryDto): Promise<PageListDto<User>> {
    // let where = [{ id: query.id }]
    // let total = await this.usersRepository.count({ where })
    let [data, total] = await this.usersRepository.findAndCount({
      where: [{ id: query.id }],
      skip: --query.pageNum * query.pageSize,
      take: query.pageSize,
    })
    return {
      total: total,
      data: data,
    }
  }

  findOne(user): Promise<User | null> {
    return this.usersRepository.findOneBy(user)
  }

  update(updateUserDto: User) {
    return this.usersRepository.update(updateUserDto.id, updateUserDto)
  }

  async softDelete(id: string): Promise<void> {
    await this.usersRepository.softDelete(id)
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }
}
