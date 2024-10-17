import { Injectable } from '@nestjs/common'
import { ArticleCatalogDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Like, Repository, TreeRepository, UpdateResult } from 'typeorm'
import { ArticleCatalog } from './entity'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { BaseService } from 'src/common/BaseService'

@Injectable()
export class ArticleCatalogsService extends BaseService<ArticleCatalog, ArticleCatalogDto> {
  constructor(@InjectRepository(ArticleCatalog) repository: TreeRepository<ArticleCatalog>) {
    super(ArticleCatalog, repository)
  }

  async save(data) {
    if (data.parentId && data.parentId != '0') {
      data.parent = Object.assign(new ArticleCatalog(), { id: data.parentId })
    } else {
      data.parentId = null
    }
    return await super.save(data)
  }

  async list(query: QueryListDto): Promise<ResponseListDto<ArticleCatalog>> {
    let { title, isActive } = query
    let queryOrm: FindManyOptions = {
      where: [{ isActive, title: this.sqlLike(title) }],
    }
    return this.listBy(queryOrm, query)
  }

  async getTrees(query): Promise<ArticleCatalog | ArticleCatalog[]> {
    return await (query?.id
      ? query?.id == 0
        ? this.repository.findRoots() // 获取所有根节点
        : (await this.repository.findDescendantsTree(new ArticleCatalog(query), { depth: 2 })).children // 获取指定id节点的子节点
      : this.repository.findTrees()) // 获取所有节点树
  }
}
