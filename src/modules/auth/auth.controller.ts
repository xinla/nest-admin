import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { Public } from './constants'
import { QueryListDto } from 'src/common/dto'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req: Record<string, any>) {
    return this.authService.login(req)
  }

  @Public()
  @Post('register')
  async register(@Body() createDto: { name; password; email }) {
    const { name, password, email } = createDto
    return this.usersService.add({ name, password, email })
  }

  @Post('logout')
  async logout(@Request() req: Record<string, any>) {
    return this.authService.logout(req)
  }

  @Get('getLoginUser')
  async getLoginUser(@Request() req: Record<string, any>) {
    const user = await this.usersService.getOne({ id: req.user.id })
    let { password, ...userInfo } = user
    return userInfo
  }

  @Get('getOnlineUsers')
  async getOnlineUsers(@Query() query: QueryListDto) {
    return await this.authService.getOnlineUsers(query)
  }

  @Post('quit')
  async quit(@Request() req: Record<string, any>) {
    return this.authService.logout(req, true)
  }
}
