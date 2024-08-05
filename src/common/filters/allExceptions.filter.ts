import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    console.error('allExceptions.filter -->', exception)
    if (exception.code == 'ER_DUP_ENTRY') {
      let match = exception.message.match(/Duplicate entry '(.+)' for/)
      exception.message = `${match[1]} 已存在`
    }

    response.status(200).json({
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      msg: exception.message,
    })
  }
}
