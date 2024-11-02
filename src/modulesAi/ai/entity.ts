import { IsNotEmpty, MaxLength } from 'class-validator'
import { BaseEntity, BaseColumn, MyEntity, boolNumColumn } from 'src/common/entity/BaseEntity'
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

@MyEntity('ai')
export class Ai extends BaseEntity {
  constructor(obj = {}) {
    super()
    this.assignOwn(obj)
  }

  @BaseColumn({ comment: '会话id' })
  @IsNotEmpty()
  sessionId: string

  @BaseColumn({ comment: '问题标题' })
  @IsNotEmpty()
  @MaxLength(30)
  question: string

  @BaseColumn(boolNumColumn('收藏', 'isCollect', BoolNum.No))
  isCollect: BoolNum

  // @BaseColumn({ type: 'enum', enum: Type, default: Type.catalog, comment: '公告类型，默认catalog' })
  // type: Type

  @BaseColumn({ length: 200, name: 'answer', comment: '回答内容' })
  answer: string

  @BaseColumn({ length: 200, name: 'remark', comment: '备注' })
  remark: string
}
