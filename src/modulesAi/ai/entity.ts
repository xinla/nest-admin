import { IsNotEmpty, MaxLength } from 'class-validator'
import { BaseEntity, BaseColumn, MyEntity, boolNumColumn } from 'src/common/entity/BaseEntity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { BoolNum } from 'src/common/type/base'
import { User } from '../../modules/users/entities/user.entity'

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

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @BaseColumn({ name: 'userId' })
  userId: string

  @BaseColumn({ comment: '会话id' })
  @IsNotEmpty()
  sessionId: string

  @BaseColumn({ comment: '问题标题' })
  @IsNotEmpty()
  question: string

  @BaseColumn({ length: 10000, name: 'answer', comment: '回答内容' })
  answer: string

  @BaseColumn(boolNumColumn('收藏', 'isCollect', BoolNum.No))
  isCollect: BoolNum

  @BaseColumn(boolNumColumn('会话', 'isSession', BoolNum.No))
  isSession: string
}
