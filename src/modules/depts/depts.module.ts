import { Module } from '@nestjs/common'
import { DeptService } from './depts.service'
import { DeptController } from './depts.controller'

@Module({
  controllers: [DeptController],
  providers: [DeptService],
})
export class DepstModule {}
