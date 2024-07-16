import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import { BooleanNumber } from '../type/base'

export class Base {
  @PrimaryGeneratedColumn()
  // @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'datetime',
    transformer: { from: (date) => date.toISOString().split('.')[0].replace('T', ' '), to: (value: string) => value },
    default: () => 'CURRENT_TIMESTAMP',
  })
  // @CreateDateColumn()
  createTime: string

  @Column({
    type: 'timestamp',
    transformer: { from: (date) => date.toISOString().split('.')[0].replace('T', ' '), to: (value: string) => value },
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  // @UpdateDateColumn()
  updateTime: string

  @DeleteDateColumn()
  deleteTime: string

  @Column({ type: 'int', width: 1, default: BooleanNumber.false })
  isDel: BooleanNumber
}
