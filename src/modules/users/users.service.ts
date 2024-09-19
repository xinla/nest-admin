import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { FindManyOptions, Like, Repository, UpdateResult } from 'typeorm'
import { ResponseListDto, QueryListDto } from 'src/common/dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Dept } from '../depts/entities/dept.entity'
import { Role } from '../roles/entity'
import { decrypt, encrypt } from 'src/common/utils/encrypt'
import { BaseService } from 'src/common/BaseService'

@Injectable()
export class UsersService extends BaseService<User, CreateUserDto> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(User, usersRepository)
  }

  // add Or Update
  async save(createDto: CreateUserDto) {
    // let data = new User()
    // createDto.dept = Object.assign(new Dept(), { id: createDto.deptId })
    delete createDto.dept
    createDto.roles = createDto.roleIds?.map((id) => Object.assign(new Role(), { id }))
    return await this.usersRepository.save(new User().assignOwn(createDto))
  }

  async getOne(query): Promise<User | null> {
    return this.usersRepository.findOneOrFail({
      where: query,
      relations: {
        dept: true,
        roles: true,
      },
    })
  }

  // 列表
  async list(query: QueryListDto): Promise<ResponseListDto<User>> {
    // let total = await this.usersRepository.count({ where })
    let { deptId, name, roleId } = query
    let queryOrm: FindManyOptions = {
      where: {
        deptId: deptId == 0 ? undefined : deptId,
        roles: { id: roleId },
        name: this.sqlLike(name),
      },
      relations: {
        dept: true,
        roles: true,
      },
    }
    return this.listBy(queryOrm, query, (data) => data.forEach((element) => delete element.password))
  }

  async resetPassword(updateDto: UpdateUserDto): Promise<UpdateResult> {
    let { id, passwordOld, passwordNew, passwordNewConfirm } = updateDto
    if (passwordNew !== passwordNewConfirm) {
      throw new Error('两次输入的密码不一致')
    } else {
      let user = await this.usersRepository.findOneByOrFail({ id })
      let _passwordOld = await decrypt(user.password)
      if (_passwordOld !== passwordOld) {
        throw new Error('旧密码不正确 ')
      }
      let data = Object.assign(new User(), { id, password: await encrypt(passwordNew) })
      return this.usersRepository.update(data.id, data)
    }
  }
}
