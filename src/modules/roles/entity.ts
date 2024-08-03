import { IsNotEmpty, MaxLength } from 'class-validator'
import { Base } from 'src/common/entity/base'
import { Column, Entity, ManyToMany } from 'typeorm'
// import { User } from '../users/entities/user.entity';

// 用户角色
@Entity('sys_role', {
  orderBy: {
    order: 'ASC',
    createTime: 'DESC',
  },
})
export class Role extends Base {
  @Column({ type: 'varchar', length: 30, default: '', comment: '' })
  @IsNotEmpty()
  @MaxLength(30)
  name: string

  // 权限字符
  @Column({ type: 'varchar', length: 30, unique: true, default: '', comment: '' })
  @IsNotEmpty()
  @MaxLength(30)
  key: string

  // @ManyToMany((type) => User)
  // users: User[]

  @Column({ default: true, name: 'is_active', comment: '是否激活，默认1是，0否' })
  isActive: boolean

  @Column({ type: 'varchar', length: 8, name: 'order', default: '1', comment: '备注' })
  order: string

  @Column({ type: 'varchar', length: 200, name: 'remark', default: '', comment: '备注' })
  remark: string
}
