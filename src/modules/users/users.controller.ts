import { Request } from 'express'
import { Body, Controller, Get, Post, Query, Put, Req, UploadedFile, HttpCode } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { HttpExceptionFilter } from '../../common/filters/httpException.filter'
import { UseFilters } from '@nestjs/common'
import { UpdateResult } from 'typeorm'

import { QueryListDto, ResponseListDto } from '../../common/dto/index'
import { BaseController } from 'src/common/BaseController'
import { MulterFileInterceptor } from 'src/common/interceptor/file.interceptor'
import { CaptchaService } from '../common/captcha.service'
import { Public } from '../auth/auth.service'

@Controller('system/users')
// @UseFilters(new HttpExceptionFilter())
export class UsersController extends BaseController<User, UsersService> {
  constructor(
    readonly usersService: UsersService,
    private captchaService: CaptchaService,
  ) {
    super(usersService)
  }

  // 重置密码
  @Public()
  @Put('resetPassword')
  async resetPassword(@Body() body) {
    let result = this.captchaService.validateCaptcha(body.uuid, body.code)
    if (result !== 'true') {
      throw new Error(result)
    }
    return this.usersService.resetPassword(body)
  }

  @Post('uploadAvatar')
  @MulterFileInterceptor('avatar')
  async uploadFile(@Req() req, @UploadedFile() file: Express.Multer.File) {
    await this.usersService.save({ id: req.user.id, avatar: file.filename })
    return { url: file.filename }
  }
}
