import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'
import { LoginLogsService } from '../loginLogs/service'
import { QueryListDto } from 'src/common/dto'

@Injectable()
export class RedisService {
  redis: Redis
  constructor(private loginLogsService: LoginLogsService) {
    this.redis = new Redis({
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      // username: "default", // needs Redis >= 6
      // password: "my-top-secret",
      db: 1, // Defaults to 0
    })
  }
  async set(key: string, value: string, time = 60) {
    if (Object.prototype.toString.call(value) === '[object Object]') {
      value = JSON.stringify(value)
    }
    return await this.redis.set(key, value, 'EX', time)
  }
  async get(key: string) {
    let value = await this.redis.get(key)
    return value
  }
  async del(key: string) {
    return await this.redis.del(key)
  }
  async ttl(key: string) {
    return await this.redis.ttl(key)
  }
  async keys(pattern: string) {
    return await this.redis.keys(pattern)
  }
  async expire(key: string, time: number) {
    return await this.redis.expire(key, time)
  }
  async exists(key: string) {
    return await this.redis.exists(key)
  }
  async hset(key: string, field: string, value: string) {
    return await this.redis.hset(key, field, value)
  }
  async hget(key: string, field: string) {
    return await this.redis.hget(key, field)
  }
  async hdel(key: string, field: string) {
    return await this.redis.hdel(key, field)
  }

  // getNotExpiredKeys
  async getNotExpiredValues(pattern = '*'): Promise<{}[]> {
    let cursor = '0'
    const notExpiredKeys = []

    while (true) {
      const [newCursor, keys] = await this.redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100)
      cursor = newCursor

      for (const key of keys) {
        const ttl = await this.ttl(key)
        if (ttl > 0) {
          let value = await this.get(key)
          notExpiredKeys.push(JSON.parse(value))
        }
      }

      if (cursor === '0') {
        break
      }
    }
    return notExpiredKeys
  }

  async getRedisOnlineUser(query: QueryListDto = {}) {
    let data: any[] = await this.getNotExpiredValues('user.online:*')
    data = data.filter((item) => {
      return (
        (!query.createTimeRange?.[0] ||
          (+new Date(item.createTime) >= +new Date(query.createTimeRange[0]) &&
            +new Date(item.createTime) <= +new Date(this.loginLogsService.dateToEndTime(query.createTimeRange[1])))) &&
        (!query.account || item.account.includes(query.account)) &&
        (!query.ip || item.ip.includes(query.ip)) &&
        (!query.address || item.address.includes(query.address))
      )
    })
    let { pageNum, pageSize } = query
    return data.slice(--pageNum * pageSize, pageSize)
  }

  async setRedisOnlineUser(reqOrData, user: any = {}) {
    if (reqOrData.session) {
      return await this.set(`user.online:${reqOrData?.session}`, reqOrData, 5 * 60)
    } else {
      let log = await this.loginLogsService.createLog(reqOrData, user, false)
      return await this.set(`user.online:${user?.session}`, log, 5 * 60)
    }
  }

  async delRedisOnlineUser(session) {
    return await this.del(`user.online:${session}`)
  }
}
