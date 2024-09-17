import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { jwtConstants } from './constants'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth.guard'
import { LoginLogsModule } from '../loginLogs/module'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    UsersModule,
    LoginLogsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
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
