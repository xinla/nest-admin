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
    let data = new User()
    //  data.dept = Object.assign(new Dept(), { id: createDto.deptId })
    createDto.roles = createDto.roleIds?.map((element) => Object.assign(new Role(), { id: element }))
    for (const key in createDto) {
      if (!Object.hasOwn(data, key)) {
        delete createDto[key]
      }
    }
    // await this.usersRepository.softRemove(data)
    Object.assign(data, createDto)
    return await this.usersRepository.save(data)
  }

  async del(id: string[] | string): Promise<UpdateResult> {
    if (typeof id == 'string') {
      id = id.split(',')
    }
    return this.usersRepository.softDelete(id)
  }

  // 列表
  async list(query: QueryListDto): Promise<ResponseListDto<User>> {
    // let total = await this.usersRepository.count({ where })
    let { pageNum, pageSize, deptId, name, roleId } = query
    let queryOrm: FindManyOptions = {
      where: [{ deptId: deptId == 0 ? undefined : deptId, name: (name &&= Like(`%${name}%`)) }],
      relations: {
        dept: true,
        roles: true,
      },
    }
    pageNum && pageSize && ((queryOrm.skip = --pageNum * pageSize), (queryOrm.take = pageSize))

    let [data, total] = await this.usersRepository.findAndCount(queryOrm)
    data.forEach((element) => {
      delete element.password
    })
    return { total: total, data: data, _flag: true }
  }

  async resetPassword(updateDto: UpdateUserDto): Promise<UpdateResult> {
    let { id, passwordOld, passwordNew, passwordNewConfirm } = updateDto
    if (passwordNew !== passwordNewConfirm) {
      throw new Error('两次输入的密码不一致')
    } else {
      let user = await this.usersRepository.findOneBy({ id })
      let _passwordOld = await decrypt(user.password)
      if (_passwordOld !== passwordOld) {
        throw new Error('旧密码不正确 ')
      }
      let data = Object.assign(new User(), { id, password: await encrypt(passwordNew) })
      return this.usersRepository.update(data.id, data)
    }
  }

  // async update(updateDto: User): Promise<UpdateResult> {
  //   let data = Object.assign(new User(), updateDto)
  //   data.roles = updateDto.roles?.map((element) => Object.assign(new Role(), { id: element }))
  //   return this.usersRepository.update(data.id, data)
  // }

  // async delete(id: string): Promise<void> {
  //   await this.usersRepository.delete(id)
  // }
}
