import { Injectable } from '@nestjs/common'
import { LoginLogDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Like, Repository, UpdateResult } from 'typeorm'
import { LoginLog } from './entity'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { BaseService } from 'src/common/BaseService'

@Injectable()
export class LoginLogsService extends BaseService<LoginLog, LoginLogDto> {
  constructor(@InjectRepository(LoginLog) repository: Repository<LoginLog>) {
    super(LoginLog, repository)
  }

  async list(query: QueryListDto = {}): Promise<ResponseListDto<LoginLog>> {
    let { account, isSuccess, ip, address, createTime } = query
    let queryOrm: FindManyOptions = {
      where: [
        {
          isSuccess,
          account: (account &&= Like(`%${account}%`)),
          ip: (ip &&= Like(`%${ip}%`)),
          address: (address &&= Like(`%${address}%`)),
        },
      ],
    }
    return this.listBy(queryOrm, query)
  }
}
