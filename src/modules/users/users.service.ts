import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageQueryDto } from 'src/common/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
  private usersRepository: Repository<User>);

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getPageList(query: PageQueryDto): Promise<User[]> {
    return this.usersRepository.findBy({
      where:{id}
    });
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }


  update(updateUserDto: UpdateUserDto) {
    return this.usersRepository.save(updateUserDto);
  }

  async softDelete(id: string): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
