import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { CommonModule } from '../common/common.module'
import { DepstModule } from '../depts/depts.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule, DepstModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
