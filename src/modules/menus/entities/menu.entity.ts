import { Base } from 'src/common/entity/base'
import { BooleanNumber } from 'src/common/type/base'
import { Column, Entity } from 'typeorm'

// 菜单类型
export enum MenuType {
  catalog = 'catalog',
  menu = 'menu',
  button = 'button',
}
export const menuTypes: { label: string; value: MenuType }[] = [
  { label: '目录', value: MenuType.catalog },
  { label: '菜单', value: MenuType.menu },
  { label: '按钮', value: MenuType.button },
]

@Entity()
export class Menu extends Base {
  @Column({ type: 'varchar', default: '' })
  name: string

  @Column({ nullable: true })
  desc: string

  @Column({ nullable: true })
  parentId: string

  @Column({ nullable: true })
  icon: string

  @Column({ nullable: true })
  order: number

  @Column({ nullable: false, default: '' })
  path: string

  @Column({ nullable: true })
  component: string

  @Column({ type: 'enum', enum: MenuType, default: MenuType.catalog, comment: '菜单类型，默认catalog' })
  type: MenuType

  @Column({ type: 'int', width: 1, default: BooleanNumber.Yes, comment: '是否显示，默认1是，0否' })
  isShow: BooleanNumber

  @Column({ type: 'int', width: 1, default: BooleanNumber.Yes, comment: '是否激活，默认1是，0否' })
  isActive: BooleanNumber
}
