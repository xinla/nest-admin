import { Module } from '@nestjs/common'
import { ArticlesService } from './service'
import { ArticlesController } from './controller'
import { Article } from './entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleCatalogsModule } from '../articleCatalogs/module'
import { TasksModule } from 'src/common/tasks/tasks.module'

@Module({
  imports: [TypeOrmModule.forFeature([Article]), ArticleCatalogsModule, TasksModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
