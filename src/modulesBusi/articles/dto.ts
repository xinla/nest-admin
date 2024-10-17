import { PartialType } from '@nestjs/mapped-types'
import { Article } from './entity'

export class ArticleDto extends PartialType(Article) {}
