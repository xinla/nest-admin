import { IsNotEmpty, MaxLength } from 'class-validator'
import { BaseEntity, BaseColumn, MyEntity, boolNumColumn, DbUnique } from 'src/common/entity/BaseEntity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { BoolNum } from 'src/common/type/base'
import { ArticleCatalog } from '../articleCatalogs/entity'
import dayjs from 'dayjs'

export enum Status {
  draft = '0',
  wait = '1',
  published = '2',
  outdate = '3',
}
export const status = {
  [Status.draft]: '草稿',
  [Status.wait]: '待发布',
  [Status.published]: '已发布',
  [Status.outdate]: '下架',
}

@MyEntity('busiArticle', {
  orderBy: {
    order: 'ASC',
    createTime: 'DESC',
  },
})
export class Article extends BaseEntity {
  constructor(obj = {}) {
    super()
    this.assignOwn(obj)
  }

  @DbUnique
  @BaseColumn()
  @IsNotEmpty()
  @MaxLength(30)
  title: string

  @BaseColumn({})
  desc: string

  @ManyToOne((type) => ArticleCatalog, (catalog) => catalog.article)
  @JoinColumn({ name: 'catalog_id' })
  catalog: ArticleCatalog

  @BaseColumn({ nullable: true, name: 'catalogId', comment: '目录id' })
  catalogId: string

  @BaseColumn({})
  thumb: string

  @BaseColumn({})
  content: string

  @BaseColumn({ length: 8, default: '1', comment: '排序' })
  order: string

  @BaseColumn({ type: 'enum', enum: Status, default: Status.published, comment: '菜单类型，默认 2' })
  status: Status

  @BaseColumn({
    type: 'datetime',
    transformer: {
      from: (date) => date && dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
      to: (value: string) => value,
    },
    nullable: true,
    name: 'publishTime',
    comment: '定时发布时间',
  })
  publishTime: string
}
