import { PartialType } from '@nestjs/mapped-types'
import { SystenConfig } from './entity'

export class SystenConfigDto extends PartialType(SystenConfig) {}
