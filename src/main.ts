import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoggingInterceptor } from './common/interceptor/logging.interceptor'
import * as csurf from 'csurf'
import { HttpExceptionFilter } from './common/filters/httpException.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  // app.use(csurf())
  app.enableCors()
  await app.listen(3000)
}
bootstrap()
