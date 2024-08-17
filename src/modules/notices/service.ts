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

  async save(noticeDto) {
    return this.repository.save(new Notice().assignOwn(noticeDto))
  }

  async list(query: QueryListDto): Promise<ResponseListDto<Notice>> {
    let { pageNum, pageSize, title, isActive } = query
    let queryOrm: FindManyOptions = {
      where: [{ isActive, title: (title &&= Like(`%${title}%`)) }],
    }
    pageNum && pageSize && ((queryOrm.skip = --pageNum * pageSize), (queryOrm.take = pageSize))

    let [data, total] = await this.repository.findAndCount(queryOrm)
    return { total: total, data: data, _flag: true }
  }
}
