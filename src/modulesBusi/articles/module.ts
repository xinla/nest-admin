import { Module } from '@nestjs/common'
import { ArticlesService } from './service'
import { ArticlesController } from './controller'
import { Article } from './entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
