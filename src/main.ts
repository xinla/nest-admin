import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoggingInterceptor } from './common/interceptor/logging.interceptor'
import * as csurf from 'csurf'
import { AllExceptionsFilter } from './common/filters/allExceptions.filter'
// import { HttpExceptionFilter } from './common/filters/httpException.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalFilters(new AllExceptionsFilter())
  // app.use(csurf())
  app.enableCors()
  await app.listen(3000)
}
bootstrap()

// declare global {
//   interface Object {
//     assignOwn(obj): any
//   }
// }
// Object.prototype.assignOwn = (obj) => {
//   for (const key in obj) {
//     if (!Object.hasOwn(this, key)) {
//       delete obj[key]
//     }
//   }
//   Object.assign(this, obj)
// }
