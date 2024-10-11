import { IsNotEmpty, MaxLength } from 'class-validator'
import { BaseEntity, BaseColumn, MyEntity, boolNumColumn } from 'src/common/entity/BaseEntity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BoolNum } from 'src/common/type/base'

// 系统配置
@MyEntity('sys_config')
export class SystenConfig extends BaseEntity {
  constructor(obj = {}) {
    super()
    this.assignOwn(obj)
  }

  @BaseColumn({ name: 'systemName' })
  @MaxLength(30)
  systemName: string

  @BaseColumn({ name: 'systemLogo' })
  systemLogo: string
}
