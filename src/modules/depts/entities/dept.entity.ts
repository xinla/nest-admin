import { Entity, Column, ManyToOne, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm'
import { Base } from 'src/common/entity/base'
import { IsEmpty, IsInt, IsNotEmpty, validate } from 'class-validator'

@Entity()
export class Dept extends Base {
  @Column({ type: 'varchar', length: 30, default: '', comment: '' })
  @IsNotEmpty()
  @IsInt()
  name: string

  @ManyToOne((type) => Dept, (category) => category.children)
  parent: Dept

  @OneToMany((type) => Dept, (category) => category.parent)
  children: Dept[]

  @BeforeInsert()
  async updateDates() {
    const errors = await validate(this)
    if (errors.length > 0) {
      throw new Error(Object.values(errors[0].constraints)[0])
    }
  }
}
