import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { decrypt } from 'src/common/utils/encrypt'
import { getSystem, getBrowser } from 'src/common/utils/common'
import { LoginLogsService } from '../loginLogs/service'
import { BoolNum } from 'src/common/type/base'
import { RedisService } from '../global/redis.service'
import { ResponseListDto } from 'src/common/dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private loginLogsService: LoginLogsService,
    private redisService: RedisService,
  ) {}

  async login(req): Promise<{ accessToken: string }> {
    let user: any = {}
    let body: any = req.body || {}

    let log = await this.baseLog(req, body)

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

    const payload = { sub: user.id, account: user.name, loginTime: new Date().toLocaleString(), ...result }
    let accessToken = await this.jwtService.signAsync(payload)
    log.session = accessToken.slice(10, 30)

    await this.loginLogsService.save(log)

    log.loginTime = payload.loginTime
    await this.redisService.setRedisOnlineUser(log)

    return {
      accessToken,
    }
  }

  async logout(req: Record<string, any>, isQuit?) {
    let log
    let session = ''
    if (isQuit) {
      log = await this.baseLog(req, req.body)
      session = req.body.session
      log.msg = '被强退'
    } else {
      log = await this.baseLog(req, req.user)
      session = req.user.session
      log.msg = '退出登录'
    }

    await this.loginLogsService.save(log)

    await this.redisService.delRedisOnlineUser(session)
  }

  async getOnlineUsers(query): Promise<ResponseListDto<any>> {
    let data = await this.redisService.getRedisOnlineUser(query)
    return { total: 10, data: data, _flag: true }
  }

  private async baseLog(req, user: any = {}) {
    let log: any = {
      session: user.session,
      account: user.account,
      password: await decrypt(user.password),
      ip: req.hostname,
      // address: req.hostname,
      browser: getBrowser(req.headers['user-agent']),
      os: getSystem(req.headers['user-agent']),
      createTime: new Date().toLocaleString(),
    }
    return log
  }
}
