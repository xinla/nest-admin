import { Module } from '@nestjs/common'
import { ArticlesService } from './service'
import { ArticlesController } from './controller'
import { Article } from './entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleCatalogsModule } from '../articleCatalogs/module'

@Module({
  imports: [TypeOrmModule.forFeature([Article]), ArticleCatalogsModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
