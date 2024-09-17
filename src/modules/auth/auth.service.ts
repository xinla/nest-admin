import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { decrypt } from 'src/common/utils/encrypt'
import { getSystem, getBrowser } from 'src/common/utils/common'
import { LoginLogsService } from '../loginLogs/service'
import { BoolNum } from 'src/common/type/base'
import { RedisService } from '../global/redis.service'
import { ResponseListDto } from 'src/common/dto'
import dayjs from 'dayjs'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private loginLogsService: LoginLogsService,
    private redisService: RedisService,
    private httpService: HttpService,
  ) {}
  async login(req): Promise<{ accessToken: string }> {
    let user: any = {}
    let body: any = req.body || {}

    let log = await this.baseLog(req, body)

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
      log.isSuccess = BoolNum.No
      log.msg = error.message
      await this.loginLogsService.save(log)
      throw error
    }
    let { password: _, ...result } = user

    const payload = { sub: user.id, account: user.name, loginTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), ...result }
    let accessToken = await this.jwtService.signAsync(payload)
    log.session = accessToken.split('.').at(-1)

    firstValueFrom(
      this.httpService
        .get(`https://api.map.baidu.com/location/ip?ip=${log.ip}&coor=bd09ll&ak=PRhu32fNCW4cib8JYW0SJGYzPQ6ORLso`)
        .pipe(
          catchError((error: AxiosError) => {
            // this.logger.error(error.response.data)
            throw 'An error happened!'
          }),
        ),
    )
      .then(({ data }) => {
        log.address = data?.content?.address
      })
      .finally(() => {
        this.loginLogsService.save(log)

        log.loginTime = payload.loginTime
        this.redisService.setRedisOnlineUser(log)
      })

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
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      // address: req.hostname,
      browser: getBrowser(req.headers['user-agent']),
      os: getSystem(req.headers['user-agent']),
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
    return log
  }
}
