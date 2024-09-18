import { Module } from '@nestjs/common'
import { LoginLogsService } from './service'
import { LoginLogsController } from './controller'
import { LoginLog } from './entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    TypeOrmModule.forFeature([LoginLog]),
    HttpModule.register({
      timeout: 500,
      maxRedirects: 5,
    }),
  ],
  controllers: [LoginLogsController],
  providers: [LoginLogsService],
  exports: [LoginLogsService],
})
export class LoginLogsModule {}
