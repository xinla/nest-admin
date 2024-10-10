import { Module } from '@nestjs/common'
import { DeptService } from './depts.service'
import { DeptController } from './depts.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Dept } from './entities/dept.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Dept])],
  controllers: [DeptController],
  providers: [DeptService],
  exports: [DeptService],
})
export class DepstModule {}
