import { Module } from '@nestjs/common'
import { ArticleCatalogsService } from './service'
import { ArticleCatalogsController } from './controller'
import { ArticleCatalog } from './entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCatalog])],
  controllers: [ArticleCatalogsController],
  providers: [ArticleCatalogsService],
  exports: [ArticleCatalogsService],
})
export class ArticleCatalogsModule {}
