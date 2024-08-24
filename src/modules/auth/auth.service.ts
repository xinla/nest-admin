import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { decrypt } from 'src/common/utils/encrypt'
import { getSystem, getBrowser } from 'src/common/utils/common'
import { LoginLogsService } from '../loginLogs/service'
import { BoolNum } from 'src/common/type/base'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private loginLogsService: LoginLogsService,
  ) {}

  async signIn(req): Promise<{ accessToken: string }> {
    let user: any = {}
    let body: any = req.body || {}
    let log: any = {
      account: body.account,
      password: await decrypt(body.password),
      ip: req.hostname,
      // address: req.hostname,
      browser: getBrowser(req.headers['user-agent']),
      os: getSystem(req.headers['user-agent']),
    }
    try {
      user = await this.usersService.getOne({ name: body.account })

      // let _password = await decrypt(user?.password)
      if (user?.password !== body.password) {
        throw new Error('密码错误')
      }
    } catch (error) {
      log.isSuccess = BoolNum.No
      log.msg = error.message
      await this.loginLogsService.save(log)
      throw error
    }
    let { password: _, ...result } = user
    await this.loginLogsService.save(log)

    const payload = { sub: user.id, account: user.name, ...result }
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
