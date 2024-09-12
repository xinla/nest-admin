import { Request } from 'express'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Put, Req, UploadedFile } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { HttpExceptionFilter } from '../../common/filters/httpException.filter'
import { UseFilters } from '@nestjs/common'
import { UpdateResult } from 'typeorm'

import { QueryListDto, ResponseListDto } from '../../common/dto/index'
import { BaseController } from 'src/common/BaseController'
import { MulterFileInterceptor } from 'src/common/interceptor/file.interceptor'

@Controller('system/users')
// @UseFilters(new HttpExceptionFilter())
export class UsersController extends BaseController<User, UsersService> {
  constructor(readonly usersService: UsersService) {
    super(usersService)
  }

  @Put('resetPassword')
  async resetPassword(@Body() updateUserDto) {
    return this.usersService.resetPassword(updateUserDto)
  }

  @Post('uploadAvatar')
  @MulterFileInterceptor('avatar')
  async uploadFile(@Req() req, @UploadedFile() file: Express.Multer.File) {
    await this.usersService.save({ id: req.user.id, avatar: file.filename })
    return { url: file.filename }
  }
}
