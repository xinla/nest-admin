import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import { BoolNum } from '../type/base'
import { validate } from 'class-validator'

export class Base {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  // @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'datetime',
    transformer: {
      from: (date) => date?.toLocaleString().replaceAll('/', '-'),
      to: (value: string) => value,
    },
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
    comment: '创建时间',
  })
  // @CreateDateColumn()
  createTime: string

  @Column({ type: 'varchar', length: 30, name: 'create_user', default: '', comment: '创建人' })
  createUser: string

  @Column({
    type: 'datetime',
    transformer: {
      from: (date) => date?.toLocaleString().replaceAll('/', '-'),
      to: (value: string) => value,
    },
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'update_time',
    comment: '更新时间',
  })
  // @UpdateDateColumn()
  updateTime: string

  @Column({ type: 'varchar', length: 30, name: 'update_user', default: '', comment: '更新人' })
  updateUser: string

  @DeleteDateColumn({ name: 'delete_time', select: false, comment: '删除时间 是否删除' })
  deleteTime: string

  // @Column({ type: 'int', width: 3, default: BoolNum.No, comment: '是否删除，默认0否，1是' })
  // isDel: BoolNum

  // @Column({ default: false, name: 'is_delete', select: false, comment: '是否删除' })
  // isDelete: boolean

  @BeforeInsert()
  @BeforeUpdate()
  async updateDates() {
    const errors = await validate(this, { skipMissingProperties: true })
    if (errors.length > 0) {
      throw new Error(Object.values(errors[0].constraints)[0])
    }
  }

  // @Column({ default: true, name: 'is_active', comment: '是否激活，默认1是，0否' })
  // isActive: boolean

  // @Column({ type: 'varchar', length: 200, name: 'remark', default: '', comment: '备注' })
  // remark: string

  assignOwn(obj) {
    for (const key in obj) {
      if (!Object.hasOwn(this, key)) {
        delete obj[key]
      }
    }
    Object.assign(this, obj)
    return this
  }
}

export function boolNumColumn(title: string, name: string, defaultValue = BoolNum.No): any {
  return {
    type: 'char',
    length: 1,
    default: defaultValue,
    name,
    comment: `是否${title}: 1是，0否，默认${defaultValue}`,
  }
}
