import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
// import { UserInterceptor } from './common/interceptor/user.interceptor'
import { LoggingInterceptor } from './common/interceptor/logging.interceptor'
import * as csurf from 'csurf'
import { AllExceptionsFilter } from './common/filters/allExceptions.filter'
// import { HttpExceptionFilter } from './common/filters/httpException.filter'
import compression from 'compression'
import { config } from 'config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false })
  // app.useGlobalInterceptors(new UserInterceptor())
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalFilters(new AllExceptionsFilter())
  // app.use(csurf())
  app.enableCors()
  app.setGlobalPrefix(config.apiBase.replace(/^\//g, ''))
  app.use(compression())
  await app.listen(3000)

  console.log(`
 _______                   __       _____       .___      .__
 \\      \\   ____   _______/  |_    /  _  \\    __| _/_____ |__| ____
 /   |   \\_/ __ \\ /  ___/\\   __\\  /  /_\\  \\  / __ |/     \\|  |/    \\
/    |    \\  ___/ \\___ \\  |  |   /    |    \\/ /_/ |  Y Y  \\  |   |  \\
\\____|__  /\\___  >____  > |__|   \\____|__  /\\____ |__|_|  /__|___|  /
        \\/     \\/     \\/                 \\/      \\/     \\/        \\/
`)
  console.log('localhost:3000 启动成功')
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
