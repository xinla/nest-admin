import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  Tree,
  TreeChildren,
  TreeParent,
  JoinColumn,
  RelationId,
} from 'typeorm'
import { Base, BaseColumn } from 'src/common/entity/base'
import { IsEmpty, IsInt, IsNotEmpty, validate } from 'class-validator'
import { User } from 'src/modules/users/entities/user.entity'

@Tree('closure-table')
@Entity('sys_dept')
export class Dept extends Base {
  constructor(obj = {}) {
    super()
    this.assignOwn(obj)
  }

  @BaseColumn({ comment: '部门名称' })
  @IsNotEmpty()
  name: string

  // @ManyToOne((type) => Dept, (dept) => dept.children)
  @TreeParent({})
  @JoinColumn({
    name: 'parent_id',
    // referencedColumnName: "name",
    // foreignKeyConstraintName: "fk_cat_id"
  })
  parent: Dept

  @BaseColumn({
    nullable: true,
    default: null,
    name: 'parent_id',
    comment: '父级id',
    transformer: { from: (value) => value || '0', to: (value: string) => value },
  })
  parentId: string

  @TreeChildren()
  children: Dept[]

  @OneToMany((type) => User, (user) => user.dept)
  user: User[]
}
