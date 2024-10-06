import { Entity, Column, ManyToOne, OneToMany, RelationId, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import { Base, BaseColumn, boolNumColumn } from 'src/common/entity/base'
import { BoolNum } from 'src/common/type/base'
import { Dept } from 'src/modules/depts/entities/dept.entity'
import { IsEmail, IsNotEmpty, IsNumberString, MaxLength, ValidateIf } from 'class-validator'
import { Role } from 'src/modules/roles/entity'

// 菜单类型
export enum GenderTypes {
  man = 'man',
  woamn = 'woamn',
}
export const genderTypes = {
  [GenderTypes.man]: '男',
  [GenderTypes.woamn]: '女',
}

@Entity('sys_user', {
  orderBy: {
    createTime: 'DESC',
  },
})
export class User extends Base {
  @BaseColumn({ unique: true })
  @IsNotEmpty()
  @MaxLength(30)
  name: string

  @BaseColumn({ comment: '昵称' })
  nickname: string

  // AES:nestAdmin,123456
  @BaseColumn({ length: 50, default: 's3wmd2VReF1IjZhK59gLBY0OjYlzjA==', comment: '密码' })
  password: string

  @BaseColumn({ comment: '头像地址' })
  avatar: string

  @BaseColumn({ unique: true, comment: '邮箱' })
  @ValidateIf((o) => o.email !== '')
  @IsEmail()
  email: string

  @BaseColumn({ length: 11, unique: true, comment: '手机号' })
  @MaxLength(11)
  @IsNumberString()
  phone: string

  @BaseColumn({ type: 'enum', enum: GenderTypes, default: null, comment: '性别，默认 null' })
  gender: GenderTypes

  // @BaseColumn({ nullable: true, name: 'roles', })
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

  @BaseColumn({ nullable: true, name: 'dept_id', comment: '部门id' })
  // @RelationId((dept: Dept) => dept.id)
  deptId: string

  @BaseColumn(boolNumColumn('激活', 'is_active', BoolNum.Yes))
  isActive: BoolNum
}
