import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common'
import { Observable, throwError, TimeoutError } from 'rxjs'
import { catchError, map, tap, timeout } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let req = context.switchToHttp().getRequest()
    console.log('请求数据：', req.url, req.method, { query: req.query, body: req.body, params: req.params })

    return next.handle().pipe(
      // timeout(8000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException())
        }
        return throwError(() => err)
      }),
      map((data) => {
        // let res = context.switchToHttp().getResponse()
        let res = { code: 200, msg: 'success', ...(data?._flag ? data : { data }) }
        delete res._flag
        console.log(req.url, '返回数据：', res)
        return res
      }),
    )
  }
}
