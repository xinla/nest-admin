import { Injectable } from '@nestjs/common'
import { ArticleDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, In, Like, Repository, UpdateResult } from 'typeorm'
import { Article, Status, status } from './entity'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { BaseService } from 'src/common/BaseService'
import { ArticleCatalogsService } from '../articleCatalogs/service'
import { TasksService } from 'src/common/tasks/tasks.service'

@Injectable()
export class ArticlesService extends BaseService<Article, ArticleDto> {
  constructor(
    @InjectRepository(Article) repository: Repository<Article>,
    private articleCatalogsService: ArticleCatalogsService,
    private tasksService: TasksService,
  ) {
    super(Article, repository)
  }

  async save(dto) {
    if (dto.publishTime) {
      dto.status = Status.wait
    }

    dto.id && this.tasksService.deleteTimeout('Timeout:articles:' + dto.id)

    let res = await super.save(dto)

    if (dto.status !== Status.draft && dto.publishTime) {
      let task = (id) => {
        this.update({ id, status: Status.published })
      }
      this.tasksService.addTimeout('Timeout:articles:' + res.id, res.publishTime, task.bind(this, res.id))
    }

    return res
  }

  async list(query: QueryListDto): Promise<ResponseListDto<Article>> {
    let { title, status, catalogId } = query
    let catalogIds = (await this.articleCatalogsService.getChildren({ id: catalogId }))?.map((item) => item.id)
    let queryOrm: FindManyOptions = {
      where: [{ status, title: this.sqlLike(title), catalogId: catalogId == 0 ? undefined : In(catalogIds) }],
    }
    return this.listBy(queryOrm, query)
  }
}
