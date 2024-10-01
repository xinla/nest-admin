import { IsNotEmpty, MaxLength } from 'class-validator'
import { Base, BaseColumn, boolNumColumn } from 'src/common/entity/base'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { User } from '../users/entities/user.entity'
import { Menu } from '../menus/menu.entity'
import { BoolNum } from 'src/common/type/base'

// 用户角色
@Entity('sys_role', {
  orderBy: {
    order: 'ASC',
    createTime: 'DESC',
  },
})
export class Role extends Base {
  @BaseColumn({ unique: true })
  @IsNotEmpty()
  @MaxLength(30)
  name: string

  // 权限字符
  @BaseColumn({ unique: true })
  @IsNotEmpty()
  @MaxLength(30)
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
