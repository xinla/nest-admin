import { Module } from '@nestjs/common'
import { CommonService } from './common.service'
import { CommonController } from './common.controller'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import path, { extname, isAbsolute, join } from 'path'
import { access, constants, mkdir } from 'fs/promises'
import { ServeStaticModule, ServeStaticModuleOptions } from '@nestjs/serve-static'

@Module({
  imports: [
    // 服务静态化, 生产环境最好使用 nginx 做资源映射， 可以根据环境配置做区分
    ServeStaticModule.forRootAsync({
      // imports: [ConfigModule],
      // inject: [ConfigService],
      useFactory: (config) => {
        const fileUploadLocationConfig = 'src/upload'
        const rootPath = isAbsolute(fileUploadLocationConfig)
          ? `${fileUploadLocationConfig}`
          : join(process.cwd(), `${fileUploadLocationConfig}`)

        return [
          {
            rootPath,
            // exclude: ['/api'], //去掉前缀路劲
            serveRoot: '/api/static', //文件虚拟路径, 必须以 / 开头， 如 http://localhost:8081/static/****.jpg  , 如果不需要则 设置 ''
            serveStaticOptions: {
              cacheControl: true,
            },
          },
        ] as ServeStaticModuleOptions[]
      },
    }),
  ],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
