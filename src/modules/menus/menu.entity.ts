import { MaxLength, IsNotEmpty } from 'class-validator'
import { Base } from 'src/common/entity/base'
import { BooleanNumber } from 'src/common/type/base'
import { Column, Entity, JoinColumn, Tree, TreeChildren, TreeParent } from 'typeorm'

// 菜单类型
export enum MenuType {
  catalog = 'catalog',
  menu = 'menu',
  button = 'button',
}
export const menuTypes = {
  [MenuType.catalog]: '目录',
  [MenuType.menu]: '菜单',
  [MenuType.button]: '按钮',
}
// export const menuTypes: { label: string; value: MenuType }[] = [
//   { label: '目录', value: MenuType.catalog },
//   { label: '菜单', value: MenuType.menu },
//   { label: '按钮', value: MenuType.button },
// ]

@Tree('closure-table')
@Entity('sys_menu', {
  orderBy: {
    order: 'ASC',
    createTime: 'DESC',
  },
})
export class Menu extends Base {
  @Column({ type: 'varchar', length: 30, default: '', comment: '菜单名称' })
  @MaxLength(30)
  @IsNotEmpty()
  name: string

  @Column({ type: 'varchar', length: 100, default: '', comment: '菜单描述' })
  @MaxLength(100)
  desc: string

  @TreeParent({})
  @JoinColumn({
    name: 'parent_id',
    // referencedColumnName: "name",
    // foreignKeyConstraintName: "fk_cat_id"
  })
  parent: Menu

  @Column({
    nullable: true,
    name: 'parent_id',
    comment: '父级id',
    transformer: { from: (value) => value || '0', to: (value: string) => value },
  })
  parentId: string

  @TreeChildren()
  children: Menu[]

  @Column({ type: 'varchar', length: 100, default: '', comment: '菜单图标' })
  icon: string

  @Column({ type: 'varchar', length: 8, default: '1', comment: '排序' })
  order: string

  @Column({ type: 'varchar', length: 100, default: '', comment: '路由地址' })
  path: string

  @Column({ type: 'varchar', length: 100, default: '', comment: '组件路径' })
  component: string

  @Column({ type: 'enum', enum: MenuType, default: MenuType.catalog, comment: '菜单类型，默认catalog' })
  type: MenuType

  @Column({ type: 'char', length: 1, default: '1', name: 'is_show:', comment: '是否显示，默认1是，0否' })
  isShow: string

  @Column({ type: 'char', length: 1, default: '1', name: 'is_active', comment: '是否激活，默认1是，0否' })
  isActive: string
}
