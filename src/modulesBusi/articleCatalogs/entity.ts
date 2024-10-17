import { IsNotEmpty, MaxLength } from 'class-validator'
import { BaseEntity, BaseColumn, MyEntity, boolNumColumn } from 'src/common/entity/BaseEntity'
import { BoolNum } from 'src/common/type/base'
import { JoinColumn, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm'
import { Article } from '../articles/entity'

// 目录
@Tree('closure-table')
@MyEntity('busiArticleCatalog')
export class ArticleCatalog extends BaseEntity {
  constructor(obj = {}) {
    super()
    this.assignOwn(obj)
  }

  @BaseColumn()
  @IsNotEmpty()
  @MaxLength(30)
  name: string

  @TreeParent({})
  @JoinColumn({
    name: 'parent_id',
    // referencedColumnName: "name",
    // foreignKeyConstraintName: "fk_cat_id"
  })
  parent: ArticleCatalog

  @BaseColumn({
    nullable: true,
    default: null,
    name: 'parent_id',
    comment: '父级id',
    transformer: { from: (value) => value || '0', to: (value: string) => value },
  })
  parentId: string

  @TreeChildren()
  children: ArticleCatalog[]

  @OneToMany((type) => Article, (article) => article.catalog)
  article: Article[]
}
