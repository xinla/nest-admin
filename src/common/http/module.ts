import { Module } from '@nestjs/common'
import { HttpService } from './service'
import { HttpModule as HttpModule1 } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule1.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
