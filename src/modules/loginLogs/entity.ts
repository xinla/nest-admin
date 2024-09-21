import { IsNotEmpty, MaxLength } from 'class-validator'
import { Base, boolNumColumn, BaseColumn, overLengthCut } from 'src/common/entity/base'
import { Column, ColumnOptions, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BoolNum } from 'src/common/type/base'

// 用户角色
@Entity('sys_login_log', {
  orderBy: {
    createTime: 'DESC',
  },
})
export class LoginLog extends Base {
  @Column({ type: 'varchar', length: 200, default: '', comment: '会话编号' })
  @IsNotEmpty()
  session: string

  @BaseColumn({ type: 'varchar', length: 30, overLengthCut: true, default: '', comment: '登录账号' })
  @IsNotEmpty()
  account: string

  @BaseColumn({ type: 'varchar', length: 30, overLengthCut: true, default: '', comment: '登录密码' })
  password: string

  @Column({ type: 'varchar', length: 30, default: '', comment: 'ip地址' })
  ip: string

  @Column({ type: 'varchar', length: 30, default: '', comment: '登录地点' })
  address: string

  @Column({ type: 'varchar', length: 30, default: '', comment: '浏览器类型' })
  browser: string

  @Column({ type: 'varchar', length: 30, default: '', comment: '操作系统' })
  os: string

  @Column(boolNumColumn('登录成功', 'is_success', BoolNum.Yes))
  isSuccess: BoolNum

  @BaseColumn({
    type: 'varchar',
    length: 500,
    overLengthCut: true,
    default: '登录成功',
    comment: '提示消息',
  })
  msg: string
}
