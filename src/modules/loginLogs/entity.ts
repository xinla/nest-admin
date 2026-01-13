import { IsNotEmpty, MaxLength } from 'class-validator'
import { BaseEntity, boolNumColumn, BaseColumn, overLengthCut, MyEntity } from 'src/common/entity/BaseEntity'
import { BoolNum } from 'src/common/type/base'

// 登录日志
@MyEntity('sys_login_log')
export class LoginLog extends BaseEntity {
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
