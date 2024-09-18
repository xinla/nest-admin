import { Global, Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { LoginLogsModule } from '../loginLogs/module'

@Global()
@Module({
  imports: [LoginLogsModule],
  controllers: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class GlobalModule {}
