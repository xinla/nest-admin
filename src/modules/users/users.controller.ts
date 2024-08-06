import { Request } from 'express'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Put, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { HttpExceptionFilter } from '../../common/filters/httpException.filter'
import { UseFilters } from '@nestjs/common'
import { UpdateResult } from 'typeorm'

import { QueryListDto, ResponseListDto } from '../../common/dto/index'
import { BaseController } from 'src/common/BaseController'

@Controller('system/users')
// @UseFilters(new HttpExceptionFilter())
export class UsersController extends BaseController<User, UsersService> {
  constructor(readonly usersService: UsersService) {
    super(usersService)
  }

  @Get('profile')
  async profile(@Req() req): Promise<{}> {
    let { password, ...user } = await this.usersService.getOne(req.user.sub)
    return user
  }

  @Put('resetPassword')
  async resetPassword(@Body() updateUserDto) {
    return this.usersService.resetPassword(updateUserDto)
  }

  // @Put('update')
  // async update(@Body() updateUserDto) {
  //   return this.usersService.update(updateUserDto)
  // }

  // @Delete('delete/:id')
  // delete(@Param('id') id: string) {
  //   return this.usersService.delete(id)
  // }
}
