import { IsNotEmpty, MaxLength } from 'class-validator'
import { Base, boolNumColumn } from 'src/common/entity/base'
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

// 用户角色
@Entity('sys_notice', {
  orderBy: {
    createTime: 'DESC',
  },
})
export class Notice extends Base {
  @Column({ type: 'varchar', length: 30, default: '', comment: '公告标题' })
  @IsNotEmpty()
  @MaxLength(30)
  title: string

  @Column(boolNumColumn('激活', 'is_active', BoolNum.Yes))
  isActive: BoolNum

  // @Column({ type: 'enum', enum: Type, default: Type.catalog, comment: '公告类型，默认catalog' })
  // type: Type

  @Column({ type: 'varchar', length: 200, name: 'content', default: '', comment: '公告内容' })
  content: string

  @Column({ type: 'varchar', length: 200, name: 'remark', default: '', comment: '备注' })
  remark: string
}
