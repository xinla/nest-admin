import { IsNotEmpty, MaxLength } from 'class-validator'
import { Base, BaseColumn, boolNumColumn } from 'src/common/entity/base'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BoolNum } from 'src/common/type/base'

// 系统配置
@Entity('sys_config', { orderBy: { createTime: 'DESC' } })
export class SystenConfig extends Base {
  @BaseColumn({ length: 100, name: 'system_name', comment: '系统名称' })
  @MaxLength(30)
  systemName: string

  @BaseColumn({ length: 200, name: 'system_logo', comment: '系统logo' })
  systemLogo: string
}
