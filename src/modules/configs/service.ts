import { Injectable } from '@nestjs/common'
import { SystenConfigDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Like, Repository, UpdateResult } from 'typeorm'
import { SystenConfig } from './entity'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { BaseService } from 'src/common/BaseService'

@Injectable()
export class SystenConfigsService extends BaseService<SystenConfig, SystenConfigDto> {
  constructor(@InjectRepository(SystenConfig) repository: Repository<SystenConfig>) {
    super(SystenConfig, repository)
  }

  async list(query: QueryListDto): Promise<ResponseListDto<SystenConfig>> {
    let { pageNum, pageSize, title, isActive } = query
    let queryOrm: FindManyOptions = {
      where: [{ isActive, title: (title &&= Like(`%${title}%`)) }],
    }
    pageNum && pageSize && ((queryOrm.skip = --pageNum * pageSize), (queryOrm.take = pageSize))

    let [data, total] = await this.repository.findAndCount(queryOrm)
    return { total: total, data: data, _flag: true }
  }
}
