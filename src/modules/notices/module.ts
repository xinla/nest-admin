import { Module } from '@nestjs/common'
import { NoticesService } from './service'
import { NoticesController } from './controller'
import { Notice } from './entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  controllers: [NoticesController],
  providers: [NoticesService],
})
export class NoticesModule {}
