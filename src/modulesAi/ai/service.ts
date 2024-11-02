import { Injectable } from '@nestjs/common'
import { AiDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Like, Repository, UpdateResult } from 'typeorm'
import { Ai } from './entity'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { BaseService } from 'src/common/BaseService'
import { send } from './hunyuan'

@Injectable()
export class AiService extends BaseService<Ai, AiDto> {
  constructor(@InjectRepository(Ai) repository: Repository<Ai>) {
    super(Ai, repository)
  }

  async list(query: QueryListDto): Promise<ResponseListDto<Ai>> {
    let { title, isActive } = query
    let queryOrm: FindManyOptions = {
      where: [{ isActive, title: this.sqlLike(title) }],
    }
    return this.listBy(queryOrm, query)
  }

  async create(dto): Promise<UpdateResult> {
    return send(dto)
  }

  async send(dto) {
    return send(dto)
  }

  async collect(dto): Promise<UpdateResult> {
    return send(dto)
  }
}
