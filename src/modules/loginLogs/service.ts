import { Injectable } from '@nestjs/common'
import { LoginLogDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, FindManyOptions, Like, Raw, Repository, UpdateResult } from 'typeorm'
import { LoginLog } from './entity'
import { QueryListDto, ResponseListDto } from 'src/common/dto'
import { BaseService } from 'src/common/BaseService'
import { decrypt } from 'src/common/utils/encrypt'
import { getSystem, getBrowser } from 'src/common/utils/common'
import dayjs from 'dayjs'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'

@Injectable()
export class LoginLogsService extends BaseService<LoginLog, LoginLogDto> {
  constructor(
    @InjectRepository(LoginLog) repository: Repository<LoginLog>,
    private httpService: HttpService,
  ) {
    super(LoginLog, repository)
  }

  async list(query: QueryListDto = {}): Promise<ResponseListDto<LoginLog>> {
    let { account, isSuccess, ip, address, createTimeRange } = query
    let queryOrm: FindManyOptions = {
      where: {
        isSuccess,
        account: this.sqlLike(account),
        ip: this.sqlLike(ip),
        address: this.sqlLike(address),
        createTime: this.betweenTime(createTimeRange),
      },
    }
    return this.listBy(queryOrm, query)
  }

  /**
   * 在线用户折线图
   * @param query { beginTime; endTime }
   * @returns
   */
  async getOnlineUsersChart(query: QueryListDto = {}): Promise<{ date: string; num: number }[]> {
    let { beginTime, endTime } = query
    return this.repository
      .createQueryBuilder('LoginLog')
      .select('DATE_FORMAT(LoginLog.createTime,"%Y-%m-%d")', 'date')
      .addSelect('count(*)', 'num')
      .where('DATE(LoginLog.createTime) BETWEEN :beginTime AND :endTime', { beginTime, endTime: endTime })
      .groupBy('DATE_FORMAT(LoginLog.createTime,"%Y-%m-%d")')
      .orderBy({ 'DATE_FORMAT(LoginLog.createTime,"%Y-%m-%d")': 'ASC' })
      .getRawMany()
      .then((data) => {
        // data?.forEach((element) => {
        //   element.date = dayjs(element.date).format('YYYY-MM-DD')
        // })
        return this.betweenDateArr([beginTime, endTime]).map(
          (item) => data.find((element) => element.date === item) || { date: item, num: 0 },
        )
      })
  }

  async createLog(req, dto: any = {}, isSave = true) {
    let log: any = {
      ...dto,
      session: dto.session,
      account: dto.account,
      createTime: dto.loginTime,
      password: dto.password && (await decrypt(dto.password)),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      // address: req.hostname,
      browser: getBrowser(req.headers['user-agent']),
      os: getSystem(req.headers['user-agent']),
    }
    if (['::1'].includes(log.ip)) {
      log.address = '本地'
    } else {
      let { data } = await firstValueFrom(
        this.httpService
          .get(`https://api.map.baidu.com/location/ip?ip=${log.ip}&coor=bd09ll&ak=PRhu32fNCW4cib8JYW0SJGYzPQ6ORLso`)
          .pipe(
            catchError((error: AxiosError) => {
              // this.logger.error(error.response.data)
              throw 'An error happened!'
            }),
          ),
      )
      log.address = data?.content?.address
    }
    isSave && (await this.save(log))
    return log
  }
}
