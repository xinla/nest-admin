import { Injectable } from '@nestjs/common'
import { LoginLogDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, FindManyOptions, Like, Raw, Repository, UpdateResult } from 'typeorm'
import { LoginLog } from './entity'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { BaseService } from 'src/common/BaseService'

@Injectable()
export class LoginLogsService extends BaseService<LoginLog, LoginLogDto> {
  constructor(@InjectRepository(LoginLog) repository: Repository<LoginLog>) {
    super(LoginLog, repository)
  }

  async list(query: QueryListDto = {}): Promise<ResponseListDto<LoginLog>> {
    let { account, isSuccess, ip, address, createTimeRange } = query
    let queryOrm: FindManyOptions = {
      where: {
        isSuccess,
        account: this.sqlLike(account),
        ip: this.sqlLike(ip),
        address: this.sqlLike(address),
        createTime: this.betweenTime(createTimeRange),
      },
    }
    return this.listBy(queryOrm, query)
  }
}
