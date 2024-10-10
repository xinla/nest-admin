import { MaxLength, IsNotEmpty } from 'class-validator'
import { Base, BaseColumn, boolNumColumn } from 'src/common/entity/base'
import { BoolNum } from 'src/common/type/base'
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
  constructor(obj = {}) {
    super()
    this.assignOwn(obj)
  }

  @BaseColumn({ comment: '菜单名称' })
  @MaxLength(30)
  @IsNotEmpty()
  name: string

  @BaseColumn({ length: 100, comment: '菜单描述' })
  @MaxLength(100)
  desc: string

  @TreeParent({})
  @JoinColumn({
    name: 'parent_id',
    // referencedColumnName: "name",
    // foreignKeyConstraintName: "fk_cat_id"
  })
  parent: Menu

  @BaseColumn({
    nullable: true,
    default: null,
    name: 'parent_id',
    comment: '父级id',
    transformer: { from: (value) => value || '0', to: (value: string) => value },
  })
  parentId: string

  @TreeChildren()
  children: Menu[]

  @BaseColumn({ length: 100, comment: '菜单图标' })
  icon: string

  @BaseColumn({ length: 8, default: '1', comment: '排序' })
  order: string

  @BaseColumn({ length: 100, comment: '路由地址' })
  path: string

  @BaseColumn({ length: 100, comment: '组件路径' })
  component: string

  @BaseColumn({ type: 'enum', enum: MenuType, default: MenuType.catalog, comment: '菜单类型，默认catalog' })
  type: MenuType

  @BaseColumn(boolNumColumn('隐藏', 'is_hidden'))
  isHidden: BoolNum

  @BaseColumn(boolNumColumn('激活', 'is_active', BoolNum.Yes))
  isActive: BoolNum
}
