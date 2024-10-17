import { IsNotEmpty, MaxLength } from 'class-validator'
import { BaseEntity, BaseColumn, MyEntity, boolNumColumn } from 'src/common/entity/BaseEntity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { BoolNum } from 'src/common/type/base'
import { ArticleCatalog } from '../articleCatalogs/entity'

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

  @BaseColumn(boolNumColumn('激活', 'is_active', BoolNum.Yes))
  isActive: BoolNum
}
