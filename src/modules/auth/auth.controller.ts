import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { Public } from './constants'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Request() req: Record<string, any>) {
    return this.authService.signIn(req)
  }

  @Get('getLoginUser')
  async getProfile(@Request() req) {
    const user = await this.usersService.getOne({ id: req.user.id })
    return user
  }
}
