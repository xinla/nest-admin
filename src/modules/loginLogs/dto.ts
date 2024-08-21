import { PartialType } from '@nestjs/mapped-types'
import { LoginLog } from './entity'

export class LoginLogDto extends PartialType(LoginLog) {}
