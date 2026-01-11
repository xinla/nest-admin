import { Module } from '@nestjs/common'
import { SystemLogService } from './service'
import { SystemLogController } from './controller'

@Module({
  imports: [
  ],
  controllers: [SystemLogController],
  providers: [SystemLogService],
  exports: [SystemLogService],
})
export class SystemLogModule { }
