import { PartialType } from '@nestjs/mapped-types'
import { Notice } from './entity'

export class NoticeDto extends PartialType(Notice) {}
