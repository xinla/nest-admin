import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { Base } from 'src/common/entity/base'

@Entity()
export class Dept extends Base {
  @Column({ type: 'varchar', length: 30, default: '', comment: '' })
  name: string

  @ManyToOne((type) => Dept, (category) => category.children)
  parent: Dept

  @OneToMany((type) => Dept, (category) => category.parent)
  children: Dept[]
}
