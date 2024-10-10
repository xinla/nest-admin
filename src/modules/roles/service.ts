import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Like, Repository, UpdateResult } from 'typeorm'
import { Role } from './entity'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { BaseService } from 'src/common/BaseService'
import { Menu } from '../menus/menu.entity'
import { MenusService } from '../menus/menus.service'
import { arrayToTree } from 'src/common/utils/common'

@Injectable()
export class RolesService extends BaseService<Role, CreateRoleDto> {
  constructor(
    @InjectRepository(Role)
    repository: Repository<Role>,
    private menusService: MenusService,
  ) {
    super(Role, repository)
  }

  async save(createDto) {
    createDto.menus = createDto.menuIds?.map((id) => Object.assign(new Menu(), { id }))
    return super.save(createDto)
  }

  async list(query: QueryListDto): Promise<ResponseListDto<Role>> {
    let { name, permissionKey, isActive } = query
    let queryOrm: FindManyOptions = {
      where: { isActive, name: this.sqlLike(name), permissionKey: this.sqlLike(permissionKey) },
      relations: {
        users: true,
        menus: true,
      },
    }
    return this.listBy(queryOrm, query)
  }

  async getLoginUserMenus(user): Promise<Menu[]> {
    if (user.name === 'admin') {
      return this.menusService.list()
    } else {
      let allMenus = []
      // 多角色菜单合并去重
      for (const element of user.roles || []) {
        if (element.isActive == 1) {
          let menus = (await this.getOne({ where: { permissionKey: element.permissionKey }, relations: ['menus'] }))
            .menus
          menus.sort((a, b) => {
            if (a.order == b.order) {
              return +new Date(b.createTime) - +new Date(a.createTime)
            } else {
              return +a.order - +b.order
            }
          })
          allMenus.length
            ? menus?.forEach((ele) => {
                allMenus.some((item) => ele.id == item.id) || allMenus.push(ele)
              })
            : allMenus.push(...menus)
        }
      }
      return arrayToTree(allMenus)
    }
  }
}
