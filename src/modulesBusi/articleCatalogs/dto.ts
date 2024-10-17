import { PartialType } from '@nestjs/mapped-types'
import { ArticleCatalog } from './entity'

export class ArticleCatalogDto extends PartialType(ArticleCatalog) {}
