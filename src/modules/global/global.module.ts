import { Global, Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { LoginLogsModule } from '../loginLogs/module'
import { MenusModule } from '../menus/menus.module'

@Global()
@Module({
  imports: [LoginLogsModule, MenusModule],
  controllers: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class GlobalModule {}
