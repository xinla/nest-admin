import { PartialType } from '@nestjs/mapped-types'
import { Ai } from './entity'

export class AiDto extends PartialType(Ai) {}
