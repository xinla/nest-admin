import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req } from '@nestjs/common'
import { ArticlesService } from './service'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { UpdateResult } from 'typeorm'
import { Article, status } from './entity'
import { BaseController } from 'src/common/BaseController'

@Controller('business/articles')
export class ArticlesController extends BaseController<Article, ArticlesService> {
  constructor(readonly service: ArticlesService) {
    super(service)
  }

  @Get('getStatus')
  getStatus() {
    return status
  }
}
