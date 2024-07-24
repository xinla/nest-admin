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
import { Base } from 'src/common/entity/base'
import { IsEmpty, IsInt, IsNotEmpty, validate } from 'class-validator'
import { User } from 'src/modules/users/entities/user.entity'

@Tree('closure-table')
@Entity('sys_dept')
export class Dept extends Base {
  @Column({ type: 'varchar', length: 30, default: '', comment: '部门名称' })
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

  @Column({
    nullable: true,
    name: 'parent_id',
    comment: '父级id',
    transformer: { from: (value) => value || '0', to: (value: string) => value },
  })
  parentId: string

  @TreeChildren()
  children: Dept[]

  // @OneToMany((type) => User, (user) => user.dept)
  // user: User[]

  @BeforeInsert()
  @BeforeUpdate()
  async updateDates() {
    const errors = await validate(this)
    if (errors.length > 0) {
      throw new Error(Object.values(errors[0].constraints)[0])
    }
  }
}
