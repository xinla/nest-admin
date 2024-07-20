import { Injectable } from '@nestjs/common'
import { CreateDeptDto } from './dto/create-dept.dto'
import { UpdateDeptDto } from './dto/update-dept.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { PageQueryDto, PageListDto } from 'src/common/dto'
import { Repository, Like } from 'typeorm'
import { Dept } from './entities/dept.entity'

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Dept)
    private usersRepository: Repository<Dept>,
  ) {}

  create(createDto: CreateDeptDto) {
    return this.usersRepository.save(createDto)
  }

  find(query): Promise<Dept[]> {
    let { name, roleId } = query
    return this.usersRepository.find({ where: [{ name: Like(`%${name}%`) }] })
  }

  async pageList(query: PageQueryDto): Promise<PageListDto<Dept>> {
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

  findOne(user): Promise<Dept | null> {
    return this.usersRepository.findOneBy(user)
  }

  update(updateUserDto: Dept) {
    return this.usersRepository.update(updateUserDto.id, updateUserDto)
  }

  async softDelete(id: string): Promise<void> {
    await this.usersRepository.softDelete(id)
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }
}
