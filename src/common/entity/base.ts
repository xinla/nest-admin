import { Column, PrimaryGeneratedColumn, DeleteDateColumn, BeforeInsert, BeforeUpdate, ColumnOptions } from 'typeorm'
import { BoolNum } from '../type/base'
import { validate } from 'class-validator'
import dayjs from 'dayjs'

export class Base {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  // @PrimaryGeneratedColumn('uuid')
  id: string

  @BaseColumn({
    type: 'datetime',
    transformer: {
      from: (date) => date && dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
      to: (value: string) => value,
    },
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
    comment: '创建时间',
  })
  // @CreateDateColumn()
  createTime: string

  @BaseColumn({ name: 'create_user', comment: '创建人' })
  createUser: string

  @BaseColumn({
    type: 'datetime',
    transformer: {
      from: (date) => date && dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
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

  @BaseColumn({ name: 'update_user', comment: '更新人' })
  updateUser: string

  @DeleteDateColumn({
    type: 'char',
    length: 1,
    name: 'is_delete',
    select: false,
    comment: '是否删除: NULL未删除，1删除',
  })
  // @BaseColumn(boolNumColumn('删除', 'is_delete', BoolNum.No, { select: false }))
  isDelete: BoolNum

  // @DeleteDateColumn({ name: 'delete_time', select: false, comment: '删除时间 是否删除' })
  // deleteTime: string

  // @BaseColumn(boolNumColumn('激活', 'is_active', BoolNum.Yes))
  // isActive: BoolNum

  // @BaseColumn({ length: 200, name: 'remark', comment: '备注' })
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

// 字符串超长截取
export function overLengthCut(value: string, maxLength: string | number) {
  return value?.length > +maxLength ? value.substring(0, +maxLength - 3) + '...' : value
}

export function BaseColumn(config: { overLengthCut?: boolean } & ColumnOptions) {
  if (config?.overLengthCut) {
    config.transformer ??= {
      from: (value: string) => value,
      to: (value: string) => overLengthCut(value, config.length),
    }
  }
  config.type ??= 'varchar'
  config.unique && !Object.hasOwn(config, 'nullable') && !Object.hasOwn(config, 'default') && (config.default = null) // 避免唯一约束的not null必填校验
  config.type == 'varchar' && !config.nullable && !Object.hasOwn(config, 'default') && (config.default ??= '')

  return Column(config)
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
