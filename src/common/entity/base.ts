import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  EntitySubscriberInterface,
  EventSubscriber,
  AfterLoad,
  Repository,
  FindManyOptions,
} from 'typeorm'
import { BoolNum } from '../type/base'
import { validate } from 'class-validator'
import { BeforeQueryEvent } from 'typeorm/subscriber/event/QueryEvent'

export class Base {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  // @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'datetime',
    transformer: {
      from: (date) => date?.toLocaleString(),
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
      from: (date) => date?.toLocaleString(),
      to: (value: string) => value,
    },
    // default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'update_time',
    comment: '更新时间',
  })
  // @UpdateDateColumn()
  updateTime: string

  @Column({ type: 'varchar', length: 30, name: 'update_user', default: '', comment: '更新人' })
  updateUser: string

  @DeleteDateColumn({
    type: 'char',
    length: 1,
    name: 'is_delete',
    select: false,
    comment: '是否删除: NULL未删除，1删除',
  })
  // @Column(boolNumColumn('删除', 'is_delete', BoolNum.No, { select: false }))
  isDelete: BoolNum

  // @DeleteDateColumn({ name: 'delete_time', select: false, comment: '删除时间 是否删除' })
  // deleteTime: string

  // @Column(boolNumColumn('激活', 'is_active', BoolNum.Yes))
  // isActive: BoolNum

  // @Column({ type: 'varchar', length: 200, name: 'remark', default: '', comment: '备注' })
  // remark: string

  // 实体监听器
  @BeforeInsert()
  @BeforeUpdate()
  async updateDates() {
    const errors = await validate(this, { skipMissingProperties: true })
    if (errors.length > 0) {
      throw new Error(Object.values(errors[0].constraints)[0])
    }
  }

  // @AfterLoad()
  // updateCounters() {
  //   console.log(this)
  // }

  // 自定义公共方法
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

export function boolNumColumn(title: string, name: string, defaultValue = BoolNum.No, options = {}): any {
  return {
    type: 'char',
    length: 1,
    default: defaultValue,
    name,
    comment: `是否${title}: 1是，0否，默认${defaultValue}`,
    ...options,
  }
}

// Object.assign(Repository.prototype, {
//   list(findManyOptions: FindManyOptions) {
//     this.find(findManyOptions)
//   },
// })

// @EventSubscriber()
// export class BaseSubscriber implements EntitySubscriberInterface {
//   beforeQuery(event: BeforeQueryEvent<any>) {
//     console.log(`BEFORE QUERY: `, event)
//   }
// }
