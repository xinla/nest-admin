import { Module } from '@nestjs/common'
import { SystenConfigsService } from './service'
import { SystenConfigsController } from './controller'
import { SystenConfig } from './entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([SystenConfig])],
  controllers: [SystenConfigsController],
  providers: [SystenConfigsService],
})
export class SystenConfigsModule {}
