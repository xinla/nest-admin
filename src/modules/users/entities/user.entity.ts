import { Entity, Column } from 'typeorm'
import { Base } from 'src/common/entity/base'
import { BooleanNumber } from 'src/common/type/base'

@Entity('sys_user')
export class User extends Base {
  @Column({ type: 'varchar', length: 30, unique: true, default: '', comment: '' })
  name: string

  @Column({ type: 'varchar', length: 30, default: '', comment: '' })
  nickname: string

  @Column({ type: 'varchar', length: 50, default: '', comment: '密码' })
  password: string

  @Column({ type: 'varchar', default: '', comment: '头像地址' })
  avatar: string

  @Column({ type: 'varchar', length: 11, default: '', comment: '手机号' })
  phone: string

  @Column({ nullable: true, type: 'simple-array', comment: '' })
  roles: string[]

  @Column({ type: 'varchar', length: 30, default: '', comment: '' })
  deptId: string

  @Column({ default: true, name: 'is_active', comment: '是否激活，默认1是，0否' })
  isActive: boolean
}
