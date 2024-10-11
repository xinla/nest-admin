import { IsNotEmpty, MaxLength } from 'class-validator'
import { BaseEntity, BaseColumn, MyEntity, boolNumColumn, DbUnique } from 'src/common/entity/BaseEntity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { User } from '../users/entities/user.entity'
import { Menu } from '../menus/menu.entity'
import { BoolNum } from 'src/common/type/base'

// 用户角色
@MyEntity('sys_role', {
  orderBy: {
    order: 'ASC',
    createTime: 'DESC',
  },
})
export class Role extends BaseEntity {
  constructor(obj = {}) {
    super()
    this.assignOwn(obj)
  }

  @DbUnique
  @IsNotEmpty()
  @MaxLength(30)
  @BaseColumn()
  name: string

  // 权限字符
  @DbUnique
  @IsNotEmpty()
  @MaxLength(30)
  @BaseColumn()
  permissionKey: string

  @ManyToMany((type) => User, (user) => user.roles)
  users: User[]

  @ManyToMany((type) => Menu, {
    cascade: true,
  })
  @JoinTable({
    name: 'sys_role_menu',
    joinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_sys_role_menu',
    },
    inverseJoinColumn: {
      name: 'menuId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_sys_menu_role',
    },
  })
  menus: Menu[]

  @BaseColumn(boolNumColumn('激活', 'is_active', BoolNum.Yes))
  isActive: BoolNum

  @BaseColumn({ length: 8, name: 'order', default: '1', comment: '排序' })
  order: string

  @BaseColumn({ length: 200, name: 'remark', comment: '备注' })
  remark: string
}
