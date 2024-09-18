import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

import { LoginLogsService } from '../loginLogs/service'
import { BoolNum } from 'src/common/type/base'
import { RedisService } from '../global/redis.service'
import { ResponseListDto } from 'src/common/dto'
import dayjs from 'dayjs'

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

    try {
      if (!body.account) {
        throw new Error('账号不能为空')
      }
      if (!body.password) {
        throw new Error('密码不能为空')
      }
      user = await this.usersService.getOne({ name: body.account })

      // let _password = await decrypt(user?.password)
      if (user?.password !== body.password) {
        throw new Error('密码错误')
      }
    } catch (error) {
      let log = {
        isSuccess: BoolNum.No,
        msg: error.message,
        ...body,
      }
      await this.loginLogsService.createLog(req, log)
      throw error
    }
    let { password: _, ...result } = user

    const payload = { sub: user.id, account: user.name, loginTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), ...result }
    let accessToken = await this.jwtService.signAsync(payload)

    let log = await this.loginLogsService.createLog(req, {
      session: accessToken.split('.').at(-1),
      loginTime: payload.loginTime,
      ...body,
    })

    await this.redisService.setRedisOnlineUser(log)

    return {
      accessToken,
    }
  }

  async logout(req: Record<string, any>, isQuit?) {
    let params = {}
    let session = ''
    if (isQuit) {
      session = req.body.session
      params = { ...req.body, msg: '被强退' }
    } else {
      session = req.user.session
      params = { ...req.user, msg: '退出登录' }
    }
    await this.loginLogsService.createLog(req, params)

    await this.redisService.delRedisOnlineUser(session)
  }

  async getOnlineUsers(query): Promise<ResponseListDto<any>> {
    let data = await this.redisService.getRedisOnlineUser(query)
    return { total: 10, data: data, _flag: true }
  }
}
