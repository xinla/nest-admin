import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { BoolNum } from './type/base'

export class BaseService<T, K> {
  Entity = null
  repository = null
  constructor(Entity: { new (): T }, repository: Repository<T>) {
    this.Entity = Entity
    this.repository = repository
  }
  async save(createDto) {
    let data = new this.Entity().assignOwn(createDto)
    return this.repository.save(data)
  }

  // async update(updateDto: Role): Promise<UpdateResult> {
  //   let data = Object.assign(new Role(), updateDto)
  //   return this.repository.update(data.id, data)
  // }

  async del(ids: string[] | string, updateUser?: string): Promise<UpdateResult> {
    if (typeof ids == 'string') {
      ids = ids.split(',')
    }
    return this.repository.update(ids, { isDelete: BoolNum.Yes, updateUser })
  }

  async getOne(query): Promise<T | null> {
    return this.repository.findOneBy(query)
  }
}
