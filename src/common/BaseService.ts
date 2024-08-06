import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'

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

  async del(id: string[] | string): Promise<UpdateResult> {
    if (typeof id == 'string') {
      id = id.split(',')
    }
    return this.repository.softDelete(id)
  }

  async getOne(query): Promise<T | null> {
    return this.repository.findOneBy(query)
  }
}
