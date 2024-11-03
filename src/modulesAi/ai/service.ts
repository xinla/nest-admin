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
    let { keywords, isCollect, sessionId, userId, question, answer } = query
    let queryOrm: FindManyOptions = {
      where: [
        {
          isCollect,
          sessionId,
          userId,
          question: this.sqlLike(question) || this.sqlLike(keywords),
          answer: this.sqlLike(answer),
        },
      ],
    }
    return this.listBy(queryOrm, query)
  }

  async create(dto) {
    return send(dto)
  }

  async send(dto) {
    return send(dto)
  }

  async collect(dto) {
    return send(dto)
  }
}
