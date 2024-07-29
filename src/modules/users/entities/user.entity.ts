import { Entity, Column, ManyToOne, OneToMany, RelationId, JoinColumn } from 'typeorm'
import { Base } from 'src/common/entity/base'
import { BooleanNumber } from 'src/common/type/base'
import { Dept } from 'src/modules/depts/entities/dept.entity'
import { IsNotEmpty, MaxLength } from 'class-validator'

@Entity('sys_user', {
  orderBy: {
    createTime: 'DESC',
  },
})
export class User extends Base {
  @Column({ type: 'varchar', length: 30, default: '', comment: '' })
  @IsNotEmpty()
  @MaxLength(30)
  name: string

  @Column({ type: 'varchar', length: 30, default: '', comment: '昵称' })
  nickname: string

  @Column({ type: 'varchar', length: 50, default: '', comment: '密码' })
  password: string

  @Column({ type: 'varchar', default: '', comment: '头像地址' })
  avatar: string

  @Column({ type: 'varchar', length: 11, default: '', comment: '手机号' })
  @MaxLength(11)
  phone: string

  // @Column({ nullable: true, type: 'simple-array', comment: '' })
  // @OneToMany((type) => Dept, (dept) => dept.id)
  // roles: string[]

  @ManyToOne((type) => Dept, (dept) => dept.user)
  @JoinColumn({ name: 'dept_id' })
  dept: Dept

  @Column({ nullable: true, name: 'dept_id', comment: '部门id' })
  // @RelationId((dept: Dept) => dept.id)
  deptId: string

  @Column({ default: true, name: 'is_active', comment: '是否激活，默认1是，0否' })
  isActive: boolean
}
