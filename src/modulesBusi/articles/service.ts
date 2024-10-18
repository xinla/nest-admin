import { Injectable } from '@nestjs/common'
import { ArticleDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, In, Like, Repository, UpdateResult } from 'typeorm'
import { Article } from './entity'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { BaseService } from 'src/common/BaseService'
import { ArticleCatalogsService } from '../articleCatalogs/service'

@Injectable()
export class ArticlesService extends BaseService<Article, ArticleDto> {
  constructor(
    @InjectRepository(Article) repository: Repository<Article>,
    private articleCatalogsService: ArticleCatalogsService,
  ) {
    super(Article, repository)
  }

  async list(query: QueryListDto): Promise<ResponseListDto<Article>> {
    let { title, isActive, catalogId } = query
    let catalogIds = (await this.articleCatalogsService.getChildren({ id: catalogId }))?.map((item) => item.id)
    let queryOrm: FindManyOptions = {
      where: [{ isActive, title: this.sqlLike(title), catalogId: catalogId == 0 ? undefined : In(catalogIds) }],
    }
    return this.listBy(queryOrm, query)
  }
}
