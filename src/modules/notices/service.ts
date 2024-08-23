import { Injectable } from '@nestjs/common'
import { NoticeDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Like, Repository, UpdateResult } from 'typeorm'
import { Notice } from './entity'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { BaseService } from 'src/common/BaseService'

@Injectable()
export class NoticesService extends BaseService<Notice, NoticeDto> {
  constructor(@InjectRepository(Notice) repository: Repository<Notice>) {
    super(Notice, repository)
  }

  async list(query: QueryListDto): Promise<ResponseListDto<Notice>> {
    let { title, isActive } = query
    let queryOrm: FindManyOptions = {
      where: [{ isActive, title: this.sqlLike(title) }],
    }
    return this.listBy(queryOrm, query)
  }
}
