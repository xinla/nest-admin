import { Request } from 'express'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  HttpException,
  HttpStatus,
  Put,
  Req,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { HttpExceptionFilter } from '../../common/filters/httpException.filter'
import { UseFilters } from '@nestjs/common'
import { UpdateResult } from 'typeorm'

import { QueryListDto, ResponseListDto } from '../../common/dto/index'

@Controller('system/users')
// @UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add')
  async add(@Body() createUserDto: User): Promise<User> {
    return this.usersService.add(createUserDto)
  }

  @Put('update')
  async update(@Body() updateUserDto: User): Promise<UpdateResult> {
    return this.usersService.update(updateUserDto)
  }

  @Delete('del/:id')
  async del(@Param('id') id: string[]) {
    return this.usersService.del(id)
  }

  @Get('list')
  async list(@Query() query: QueryListDto): Promise<ResponseListDto<User>> {
    return this.usersService.list(query)
  }

  @Get('getOne')
  async getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getOne({ id })
  }

  @Get('profile')
  async profile(@Req() req): Promise<{}> {
    let { password, ...user } = await this.usersService.getOne(req.user.sub)
    return user
  }

  // @Delete('delete/:id')
  // delete(@Param('id') id: string) {
  //   return this.usersService.delete(id)
  // }
}
