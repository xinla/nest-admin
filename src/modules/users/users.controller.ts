import { Request } from 'express';
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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { HttpExceptionFilter } from '../../common/filters/httpException.filter';
import { UseFilters } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

import { PageQueryDto, PageListDto } from '../../common/dto/index';

@Controller('system/users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: User): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put()
  update(@Body() updateUserDto: User): Promise<UpdateResult> {
    return this.usersService.update(updateUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('getPageList')
  getPageList(@Query() query: PageQueryDto): Promise<PageListDto<User>> {
    return this.usersService.getPageList(query);
  }

  @Get('getDetail')
  findOne(@Query('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('profile')
  async profile(@Req() req): Promise<{}> {
    let { password, ...user } = await this.usersService.findOne(req.user.sub);
    return user;
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.usersService.softDelete(id);
  }

  @Delete('del/:id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
