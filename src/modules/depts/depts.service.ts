import { Injectable } from '@nestjs/common'
import { CreateDeptDto } from './dto/create-dept.dto'
import { UpdateDeptDto } from './dto/update-dept.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { PageQueryDto, PageListDto } from 'src/common/dto'
import { Repository, Like } from 'typeorm'
import { Dept } from './entities/dept.entity'
import { DataSource } from 'typeorm'

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Dept)
    private repository: Repository<Dept>,
    private dataSource: DataSource,
  ) {}

  add(createDto: CreateDeptDto) {
    return this.repository.save(createDto)
  }

  findTree(query): Promise<Dept[]> {
    let { name, roleId } = query
    return this.dataSource.manager.getTreeRepository(Dept).findTrees()
  }

  find(query): Promise<Dept[]> {
    let { name, roleId } = query
    return this.repository.find({ where: [{ name: Like(`%${name}%`) }] })
  }

  async pageList(query: PageQueryDto): Promise<PageListDto<Dept>> {
    // let where = [{ id: query.id }]
    // let total = await this.repository.count({ where })
    let [data, total] = await this.repository.findAndCount({
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
    return this.repository.findOneBy(user)
  }

  update(updateUserDto: Dept) {
    return this.repository.update(updateUserDto.id, updateUserDto)
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
