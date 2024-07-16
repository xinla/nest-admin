import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoggingInterceptor } from './common/interceptor/logging.interceptor'
import * as csurf from 'csurf'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new LoggingInterceptor())
  // app.use(csurf())
  app.enableCors()
  await app.listen(3000)
}
bootstrap()
