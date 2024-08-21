import { Module } from '@nestjs/common'
import { LoginLogsService } from './service'
import { LoginLogsController } from './controller'
import { LoginLog } from './entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([LoginLog])],
  controllers: [LoginLogsController],
  providers: [LoginLogsService],
  exports: [LoginLogsService],
})
export class LoginLogsModule {}
