import { Between, FindManyOptions, FindOneOptions, FindOptionsWhere, In, Like, Repository, UpdateResult } from 'typeorm'
import { BoolNum } from './type/base'
import { QueryListDto, ResponseListDto, SaveDto } from './dto'
import dayjs from 'dayjs'
import { validate } from 'class-validator'
import { config } from 'config'
import { HttpException } from '@nestjs/common'
import { User } from 'src/modules/users/entities/user.entity'
import { dataPermissionType, DataPermissionType } from 'src/modules/roles/entity'
import { Dept } from 'src/modules/depts/entities/dept.entity'

// 服务基类
export class BaseService<T, K> {
  Entity = null
  repository = null
  constructor(Entity: { new (): T }, repository: Repository<T>) {
    this.Entity = Entity
    this.repository = repository
  }

  // typeorm save 会保存关系，create 和 update 不会保存关系
  async save(dto: SaveDto<T>) {
    delete dto.createTime
    delete dto.updateTime

    if (dto.id) {
      delete dto.createUser
      delete dto.createUserId
    } else {
      delete dto.updateUser
    }

    let data = new this.Entity(dto)

    // 字段校验 / class-validator
    const errors = await validate(data, { skipMissingProperties: true })
    if (errors.length > 0) {
      throw new Error(Object.values(errors[0].constraints)[0])
    }

    // 数据库唯一字段校验 / @DbUnique
    for (const element of data._DbUnique || []) {
      if (!data[element] && data[element] !== 0) continue
      let res = await this.sqlOne({ [element]: data[element] })
      if (res && res?.id != data.id) {
        throw new Error(`${data[element]} 已存在`)
      }
    }
    await this.dataValidate(data)
    return this.repository.save(data)
  }

  async add(dto: SaveDto<T>) {
    delete dto.id
    return this.save(dto)
  }

  async update(dto: SaveDto<T>) {
    if (!dto.id) throw new Error('数据不存在')
    return this.save(dto)
  }

  async list(query: QueryListDto, other?): Promise<ResponseListDto<T> | T[]> {
    return this.listBy({}, query)
  }

  async del(ids: string[] | string, { updateUser, _userId }): Promise<UpdateResult> {
    if (typeof ids == 'string') {
      ids = ids.split(',')
    }
    await this.dataValidate({ id: ids?.[0], _userId })
    return this.repository.update(ids, { isDelete: BoolNum.Yes, updateUser })
  }

  async getOne(query: (FindOptionsWhere<T> & FindOneOptions) | {}, isError = true): Promise<any | null> {
    let res = await this.sqlOne(query)
    if (!res && isError) {
      throw new Error('数据不存在')
    }
    return res
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

    // 数据权限控制
    if (query._isDataPermission) {
      let userIds = await this.getUserDataPermissionRelatedUserIds(query._userId)
      if (userIds !== '*') {
        queryOrm.where = Object.assign(queryOrm.where || {}, {
          createUserId: In(userIds as [string]),
        })
      }
    }

    let [data, total] = await this.repository.findAndCount(queryOrm)
    return { total: total, data: cb?.(data) || data, _flag: true }
  }

  // 单条查询统一公用接口，禁止子类重写
  async sqlOne(query: FindOptionsWhere<T> & FindOneOptions): Promise<any | null> {
    if (!query) return null
    let isEmpty = true
    // 查询参数为空，则返回空
    if (typeof query?.where == 'object') {
      for (const key in query.where) {
        if (query.where[key] !== undefined) {
          isEmpty = false
          break
        }
      }
    } else {
      for (const key in query) {
        if (query[key] !== undefined) {
          isEmpty = false
          break
        }
      }
      query.where = JSON.parse(JSON.stringify(query))
    }
    if (isEmpty || Object.keys(query).length == 0) return null
    return this.repository.findOne(query)
  }

  // 模糊匹配
  sqlLike(value) {
    return value == undefined ? undefined : Like(`%${value.replace(/%/g, '\\%').replace(/_/g, '\\_')}%`)
    // : Raw((alias) => `${alias} LIKE :value`, { value: `%${value.replace(/%/g, '\\%').replace(/_/g, '\\_')}%` })
  }

  // 日期加上23:59:59
  dateToEndTime(date = '') {
    return date.includes(':') ? date : (date += ' 23:59:59')
  }

  // 时间范围处理
  betweenTime(beginEndTime: [string, string]) {
    if (!beginEndTime?.[0]) return
    // 需要查询包含结束当天的值，需给结束日期加上23:59:59
    beginEndTime[1] &&= this.dateToEndTime(beginEndTime[1])
    return Between(beginEndTime[0], beginEndTime[1])
  }

  // 时间范围处理，返回日期数组
  betweenDateArr(beginEndTime: [string, string]) {
    return (
      beginEndTime?.[0] &&
      beginEndTime?.[1] &&
      Array.from({ length: dayjs(beginEndTime[1]).diff(beginEndTime[0], 'day') + 1 }, (_, i) =>
        dayjs(beginEndTime[0]).add(i, 'day').format('YYYY-MM-DD'),
      )
    )
  }

  // 获取用户数据权限范围相关联的人员
  async getUserDataPermissionRelatedUserIds(userId: string) {
    let user = await this.repository.manager.findOne(User, {
      where: { id: userId },
      relations: {
        // dept: true,
        roles: true,
      },
    })
    if (user.name === config.adminKey) {
      return '*'
    }
    user.dataPermissionType = user.roles?.sort(
      (a, b) => dataPermissionType[b.dataPermissionType].weight - dataPermissionType[a.dataPermissionType].weight,
    )?.[0]?.dataPermissionType

    let userList: User[] = []
    // 个人数据权限
    if (user?.dataPermissionType == DataPermissionType.self) {
      userList = [user]
    }
    // 部门数据权限
    else if (user?.dataPermissionType == DataPermissionType.dept) {
      // 获取用户所在部门下的所有人员 createUser 包含这些人员的数据
      userList = await this.repository.manager.findBy(User, { deptId: user.deptId })
    }
    // 部门及子部门数据权限
    else if (user?.dataPermissionType == DataPermissionType.deptAndChildren) {
      // 获取用户所在部门下的所有子部门
      let deptIds = (await this.repository.manager.getRepository(Dept).findDescendants({ id: user.deptId }))?.map(
        (item) => item.id,
      )
      // 获取用户所在部门下及所有子部门的所有人员 createUser 包含这些人员的数据
      userList = await this.repository.manager.findBy(User, { deptId: In(deptIds) })
    }
    return userList.map((item) => item.id)
  }

  // 数据权限校验
  async dataValidate(data: { id; _userId }): Promise<boolean> {
    let row = data.id && (await this.getOne({ id: data.id }, false))
    let userIds = await this.getUserDataPermissionRelatedUserIds(data._userId)

    if (userIds !== '*' && data.id && !userIds.includes(row?.createUserId)) {
      // if (data.id && (!row?.createUser || row?.createUser === config.adminKey) && data.updateUser !== config.adminKey) {
      throw new HttpException('接口无权限', 403)
    }
    return true
  }
}
