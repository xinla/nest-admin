import { IsNotEmpty, MaxLength } from 'class-validator'
import { Base, BaseColumn, boolNumColumn } from 'src/common/entity/base'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BoolNum } from 'src/common/type/base'

// 类型
// export enum Type {
//   catalog = 'catalog',
//   menu = 'menu',
// }
// export const menuTypes = {
//   [Type.catalog]: '目录',
//   [Type.menu]: '菜单',
// }

@Entity('sys_notice', {
  orderBy: {
    createTime: 'DESC',
  },
})
export class Notice extends Base {
  constructor(obj = {}) {
    super()
    this.assignOwn(obj)
  }

  @BaseColumn({ comment: '公告标题' })
  @IsNotEmpty()
  @MaxLength(30)
  title: string

  @BaseColumn(boolNumColumn('激活', 'is_active', BoolNum.Yes))
  isActive: BoolNum

  // @BaseColumn({ type: 'enum', enum: Type, default: Type.catalog, comment: '公告类型，默认catalog' })
  // type: Type

  @BaseColumn({ length: 200, name: 'content', comment: '公告内容' })
  content: string

  @BaseColumn({ length: 200, name: 'remark', comment: '备注' })
  remark: string
}
