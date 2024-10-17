import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req } from '@nestjs/common'
import { ArticleCatalogsService } from './service'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { UpdateResult } from 'typeorm'
import { ArticleCatalog } from './entity'
import { BaseController } from 'src/common/BaseController'

@Controller('business/articleCatalogs')
export class ArticleCatalogsController extends BaseController<ArticleCatalog, ArticleCatalogsService> {
  constructor(readonly service: ArticleCatalogsService) {
    super(service)
  }

  @Get('getTrees')
  getTrees(@Query() query) {
    return this.service.getTrees(query)
  }
}
