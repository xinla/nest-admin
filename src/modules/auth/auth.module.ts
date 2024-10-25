import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { jwtConstants } from './constants'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth.guard'
import { LoginLogsModule } from '../loginLogs/module'
import { CommonModule } from '../common/common.module'
import dayjs from 'dayjs'

@Module({
  imports: [
    UsersModule,
    CommonModule,
    LoginLogsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: dayjs().add(1, 'day').startOf('day').diff(dayjs(), 'second') }, // 到当天结束过期
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
