import { Injectable } from '@nestjs/common'
import { CreateDeptDto } from './dto/create-dept.dto'
import { UpdateDeptDto } from './dto/update-dept.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like, TreeRepository } from 'typeorm'
import { Dept } from './entities/dept.entity'
import { DataSource } from 'typeorm'
import { validate } from 'class-validator'
import { BaseService } from 'src/common/BaseService'

@Injectable()
export class DeptService extends BaseService<Dept, CreateDeptDto> {
  constructor(
    @InjectRepository(Dept)
    repository: Repository<Dept>,
    @InjectRepository(Dept)
    private treeRepository: TreeRepository<Dept>,
  ) {
    super(Dept, repository)
  }

  async save(data) {
    if (data.parentId && data.parentId != '0') {
      data.parent = Object.assign(new Dept(), { id: data.parentId })
    } else {
      data.parentId = null
    }
    return await this.repository.save(new Dept().assignOwn(data))
  }

  async findTree(query): Promise<Dept[]> {
    return await this.treeRepository.findTrees()
  }

  // async update(updateDto: Dept) {
  //   let { id, parentId, name } = updateDto
  //   let data = Object.assign(new Dept(), { id, parentId, name })
  //   if (data.parentId !== '0') {
  //     data.parent = Object.assign(new Dept(), { id: data.parentId })
  //   } else {
  //     delete data.parentId
  //   }
  //   return this.repository.update(data.id, data)
  // }
}
