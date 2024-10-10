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
  constructor(obj = {}) {
    super()
    this.assignOwn(obj)
  }

  @BaseColumn({ length: 200, comment: '会话编号' })
  @IsNotEmpty()
  session: string

  @BaseColumn({ overLengthCut: true, comment: '登录账号' })
  @IsNotEmpty()
  account: string

  @BaseColumn({ overLengthCut: true, comment: '登录密码' })
  password: string

  @BaseColumn({ comment: 'ip地址' })
  ip: string

  @BaseColumn({ comment: '登录地点' })
  address: string

  @BaseColumn({ comment: '浏览器类型' })
  browser: string

  @BaseColumn({ comment: '操作系统' })
  os: string

  @BaseColumn(boolNumColumn('登录成功', 'is_success', BoolNum.Yes))
  isSuccess: BoolNum

  @BaseColumn({
    length: 500,
    overLengthCut: true,
    default: '登录成功',
    comment: '提示消息',
  })
  msg: string
}
