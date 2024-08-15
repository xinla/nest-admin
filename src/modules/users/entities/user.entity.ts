import { Entity, Column, ManyToOne, OneToMany, RelationId, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import { Base } from 'src/common/entity/base'
import { BoolNum } from 'src/common/type/base'
import { Dept } from 'src/modules/depts/entities/dept.entity'
import { IsEmail, IsNotEmpty, IsNumberString, MaxLength } from 'class-validator'
import { Role } from 'src/modules/roles/entity'

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

  // AES:nestAdmin,123456
  @Column({ type: 'varchar', length: 50, default: 's3wmd2VReF1IjZhK59gLBY0OjYlzjA==', comment: '密码' })
  password: string

  @Column({ type: 'varchar', default: '', comment: '头像地址' })
  avatar: string

  // @Column({ type: 'varchar', default: '', comment: '' })
  // @IsEmail()
  // email: string

  @Column({ type: 'varchar', length: 11, default: '', comment: '手机号' })
  @MaxLength(11)
  @IsNumberString()
  phone: string

  // @Column({ nullable: true, name: 'roles', comment: '' })
  @ManyToMany(() => Role, (role) => role.users, {
    cascade: true,
  })
  @JoinTable({
    name: 'sys_user_role',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_sys_user_role_user',
    },
    inverseJoinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_sys_user_role_role',
    },
  })
  roles: Role[]

  @ManyToOne((type) => Dept, (dept) => dept.user)
  @JoinColumn({ name: 'dept_id' })
  dept: Dept

  @Column({ nullable: true, name: 'dept_id', comment: '部门id' })
  // @RelationId((dept: Dept) => dept.id)
  deptId: string

  @Column({ type: 'char', length: 1, default: '1', name: 'is_active', comment: '是否激活，默认1是，0否' })
  // @Column({ default: true, name: 'is_active', comment: '是否激活，默认1是，0否' })
  isActive: boolean
}
