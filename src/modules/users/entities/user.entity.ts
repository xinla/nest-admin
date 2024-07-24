import { Entity, Column, ManyToOne, OneToMany, RelationId } from 'typeorm'
import { Base } from 'src/common/entity/base'
import { BooleanNumber } from 'src/common/type/base'
import { Dept } from 'src/modules/depts/entities/dept.entity'

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

  // @Column({ nullable: true, type: 'simple-array', comment: '' })
  // @OneToMany((type) => Dept, (dept) => dept.id)
  // roles: string[]

  @ManyToOne('Dept', { createForeignKeyConstraints: false })
  dept: Dept

  @Column({ type: 'varchar', length: 30, name: 'dept_id', default: '', comment: '' })
  // @RelationId((dept: Dept) => dept.id)
  deptId: string

  @Column({ default: true, name: 'is_active', comment: '是否激活，默认1是，0否' })
  isActive: boolean
}
