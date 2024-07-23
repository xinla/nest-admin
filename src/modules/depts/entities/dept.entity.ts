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
} from 'typeorm'
import { Base } from 'src/common/entity/base'
import { IsEmpty, IsInt, IsNotEmpty, validate } from 'class-validator'

@Entity()
@Tree('closure-table')
export class Dept extends Base {
  @Column({ type: 'varchar', length: 30, default: '', comment: '' })
  @IsNotEmpty()
  name: string

  // @ManyToOne((type) => Dept, (dept) => dept.children)
  @TreeParent()
  parent: Dept

  @Column({ default: '0', name: 'parent_id', comment: '父级id' })
  parentId: string

  // // @OneToMany((type) => Dept, (dept) => dept.parent)
  @TreeChildren()
  children: Dept[]

  @BeforeInsert()
  @BeforeUpdate()
  async updateDates() {
    const errors = await validate(this)
    if (errors.length > 0) {
      throw new Error(Object.values(errors[0].constraints)[0])
    }
  }
}
