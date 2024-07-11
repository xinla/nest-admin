import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Base } from 'src/common/entity/base'
import { BooleanNumber } from 'src/common/type/base'

@Entity()
export class User extends Base {
  @Column({ type: 'varchar', length: 30, default: '', comment: '' })
  name: string

  @Column({ type: 'varchar', length: 30, default: '' })
  nickname: string

  @Column({ type: 'varchar', length: 50, default: '' })
  password: string

  @Column({ type: 'varchar', default: '' })
  avatar: string

  @Column({ type: 'varchar', length: 11, default: '' })
  phone: string

  @Column({ type: 'simple-array' })
  roles: string[]

  @Column({ type: 'int', width: 1, default: BooleanNumber.true, comment: '是否激活，默认1是，0否' })
  isActive: BooleanNumber
}
