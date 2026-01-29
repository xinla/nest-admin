import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { AuthService, Public } from './auth.service'
import { UsersService } from '../users/users.service'
import { QueryListDto } from 'src/common/dto'
import { encrypt } from 'src/common/utils/encrypt'
import { CaptchaService } from '../common/captcha.service'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private captchaService: CaptchaService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req: Record<string, any>) {
    return this.authService.login(req)
  }

  @Public()
  @Post('register')
  async register(@Body() body: { name; password; uuid; code; email? }) {
    let result = this.captchaService.validateCaptcha(body.uuid, body.code)
    if (result !== 'true') {
      throw new Error(result)
    }

    let { name, password, email } = body
    password = await encrypt(password)

    return this.usersService.add({ name, password, email })
  }

  @Post('logout')
  async logout(@Request() req: Record<string, any>) {
    return this.authService.logout(req)
  }

  @Get('getLoginUser')
  async getLoginUser(@Request() req: Record<string, any>) {
    try {
      const user = await this.usersService.getOne({ id: req.user.id })
      let { password, ...userInfo } = user
      return userInfo
    } catch (error) {
      throw new UnauthorizedException()
    }
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
