import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from 'src/common/entity/base';
import { BooleanNumber } from 'src/common/type/base';

@Entity()
export class User extends Base {
  @Column({ type: 'varchar', length: 30, comment: '' })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  nickname: string;

  @Column({ type: 'varchar', length: 50 })
  password: string;

  @Column({ type: 'varchar' })
  avatar: string;

  @Column({ type: 'varchar', length: 11 })
  phone: string;

  @Column({ type: 'simple-array' })
  roles: string[];

  @Column({
    type: 'int',
    default: BooleanNumber.true,
    comment: '是否激活，默认1是，0否',
  })
  isActive: BooleanNumber;
}
