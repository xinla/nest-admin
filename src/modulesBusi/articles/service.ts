import { Injectable } from '@nestjs/common'
import { ArticleDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Like, Repository, UpdateResult } from 'typeorm'
import { Article } from './entity'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { BaseService } from 'src/common/BaseService'

@Injectable()
export class ArticlesService extends BaseService<Article, ArticleDto> {
  constructor(@InjectRepository(Article) repository: Repository<Article>) {
    super(Article, repository)
  }

  async list(query: QueryListDto): Promise<ResponseListDto<Article>> {
    let { title, isActive } = query
    let queryOrm: FindManyOptions = {
      where: [{ isActive, title: this.sqlLike(title) }],
    }
    return this.listBy(queryOrm, query)
  }
}
