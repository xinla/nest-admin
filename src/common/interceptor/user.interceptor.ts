import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common'
import { Observable, throwError, TimeoutError } from 'rxjs'
import { catchError, map, tap, timeout } from 'rxjs/operators'
import { RedisService } from 'src/modules/global/redis.service'

@Injectable()
export class UserInterceptor implements NestInterceptor {
  redisService: RedisService
  constructor() {
    this.redisService = new RedisService()
    console.log('--> UserInterceptor')
  }
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    let req = context.switchToHttp().getRequest()
    req.user && (await this.redisService.setRedisOnlineUser(req, req.user))
    return next.handle().pipe()
  }
}
