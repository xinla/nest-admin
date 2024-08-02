import { Injectable } from '@nestjs/common'
import { CreateDeptDto } from './dto/create-dept.dto'
import { UpdateDeptDto } from './dto/update-dept.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { PageQueryDto, PageListDto } from 'src/common/dto'
import { Repository, Like, TreeRepository } from 'typeorm'
import { Dept } from './entities/dept.entity'
import { DataSource } from 'typeorm'
import { validate } from 'class-validator'

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Dept)
    private repository: Repository<Dept>,
    @InjectRepository(Dept)
    private treeRepository: TreeRepository<Dept>,
  ) {}

  async add(createDto) {
    let data = Object.assign(new Dept(), createDto)
    if (data.parentId && data.parentId != '0') {
      data.parent = Object.assign(new Dept(), { id: data.parentId })
    } else {
      delete data.parentId
    }
    return this.repository.save(data)
  }

  findTree(query): Promise<Dept[]> {
    return this.treeRepository.findTrees()
  }

  async list(query): Promise<Dept[]> {
    let { name, roleId } = query
    return this.repository.find({ where: [{ name: Like(`%${name}%`) }] })
  }

  async update(updateDto: Dept) {
    let { id, parentId, name } = updateDto
    let data = Object.assign(new Dept(), { id, parentId, name })
    if (data.parentId !== '0') {
      data.parent = Object.assign(new Dept(), { id: data.parentId })
    } else {
      delete data.parentId
    }
    return this.repository.update(data.id, data)
  }

  async del(id: string): Promise<void> {
    await this.repository.softDelete(id)
  }
}
