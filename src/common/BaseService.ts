import { InjectRepository } from '@nestjs/typeorm'
import { Between, FindManyOptions, FindOptions, FindOptionsWhere, Like, Raw, Repository, UpdateResult } from 'typeorm'
import { BoolNum } from './type/base'
import { QueryListDto, ResponseListDto, SaveDto } from './dto'

export class BaseService<T, K> {
  Entity = null
  repository = null
  constructor(Entity: { new (): T }, repository: Repository<T>) {
    this.Entity = Entity
    this.repository = repository
  }

  // typeorm save 会保存关系，create 和 update 不会保存关系
  async save(dto: SaveDto<T>) {
    let data = new this.Entity().assignOwn(dto)
    return this.repository.save(data)
  }

  async del(ids: string[] | string, updateUser?: string): Promise<UpdateResult> {
    if (typeof ids == 'string') {
      ids = ids.split(',')
    }
    return this.repository.update(ids, { isDelete: BoolNum.Yes, updateUser })
  }

  async getOne(query: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOneByOrFail(query)
  }

  // async update(updateDto: Role): Promise<UpdateResult> {
  //   let data = Object.assign(new Role(), updateDto)
  //   return this.repository.update(data.id, data)
  // }

  // --- sql 相关方法 ---
  // 列表查询
  async listBy(
    queryOrm: FindManyOptions = {},
    query: QueryListDto = {},
    cb?: (data: any[]) => [] | void,
  ): Promise<ResponseListDto<T>> {
    //
    let { pageNum, pageSize } = query
    // pageNum 当前页码 从1开始
    pageNum && pageSize && ((queryOrm.skip = --pageNum * pageSize), (queryOrm.take = pageSize))

    let [data, total] = await this.repository.findAndCount(queryOrm)
    return { total: total, data: cb?.(data) || data, _flag: true }
  }

  // 模糊匹配
  sqlLike(value) {
    return value == undefined ? undefined : Like(`%${value.replace(/%/g, '\\%').replace(/_/g, '\\_')}%`)
    // : Raw((alias) => `${alias} LIKE :value`, { value: `%${value.replace(/%/g, '\\%').replace(/_/g, '\\_')}%` })
  }

  // 时间范围处理
  betweenTime(beginEndTime: [string, string]) {
    // 需要查询包含结束当天的值，需给结束日期加上23:59:59
    if (beginEndTime?.[1]?.length <= 10) {
      beginEndTime[1] += ' 23:59:59'
    }
    return beginEndTime?.[0] && Between(beginEndTime[0], beginEndTime[1])
  }
}
