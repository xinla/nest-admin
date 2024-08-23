import { InjectRepository } from '@nestjs/typeorm'
import { Between, FindManyOptions, Like, Raw, Repository, UpdateResult } from 'typeorm'
import { BoolNum } from './type/base'
import { QueryListDto, ResponseListDto } from './dto'

export class BaseService<T, K> {
  Entity = null
  repository = null
  constructor(Entity: { new (): T }, repository: Repository<T>) {
    this.Entity = Entity
    this.repository = repository
  }

  async save(dto) {
    let data = new this.Entity().assignOwn(dto)
    return this.repository.save(data)
  }

  async listBy(
    queryOrm: FindManyOptions = {},
    query: QueryListDto = {},
    cb?: (data: any[]) => [] | void,
  ): Promise<ResponseListDto<T>> {
    //
    let { pageNum, pageSize } = query
    pageNum && pageSize && ((queryOrm.skip = --pageNum * pageSize), (queryOrm.take = pageSize))

    let [data, total] = await this.repository.findAndCount(queryOrm)
    return { total: total, data: cb?.(data) || data, _flag: true }
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

  // 模糊查询
  sqlLike(value) {
    return value == undefined ? undefined : Like(`%${value.replace(/%/g, '\\%').replace(/_/g, '\\_')}%`)
    // : Raw((alias) => `${alias} LIKE :value`, { value: `%${value.replace(/%/g, '\\%').replace(/_/g, '\\_')}%` })
  }

  // 时间范围查询
  betweenTime(beginEndTime: [string, string]) {
    // 需要查询包含结束当天的值，需给结束日期加上23:59:59
    if (beginEndTime?.[1]?.length <= 10) {
      beginEndTime[1] += ' 23:59:59'
    }
    return beginEndTime?.[0] && Between(beginEndTime[0], beginEndTime[1])
  }
}
