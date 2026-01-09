import { Module, NestMiddleware } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname, isAbsolute, join } from 'path';
import { access, constants, mkdir } from 'fs/promises';
import { CaptchaService } from './captcha.service';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';

// 静态文件中间件
import { Request, Response, NextFunction } from 'express';

export class StaticFileMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 检查请求是否匹配静态资源路径 - 支持 /static/ 和 /api/static/ 两种路径
    if (req.url.startsWith('/static/') || req.url.startsWith('/api/static/')) {
      // 获取文件路径
      let filePath = req.url;
      // 移除路径前缀
      if (filePath.startsWith('/api/static/')) {
        filePath = filePath.replace('/api/static/', '');
      } else if (filePath.startsWith('/static/')) {
        filePath = filePath.replace('/static/', '');
      }

      const fullPath = join(process.cwd(), 'upload', filePath);

      // 检查文件是否存在
      import('fs')
        .then(fs => {
          fs.access(fullPath, fs.constants.R_OK, (err) => {
            if (!err) {
              res.sendFile(fullPath);
            } else {
              // 如果文件不存在，继续下一个中间件
              next();
            }
          });
        })
        .catch(() => {
          next();
        });
    } else {
      next();
    }
  }
}

@Module({
  imports: [
    // 注释掉静态文件服务，因为它与新版 path-to-regexp 不兼容
    // ServeStaticModule.forRoot({
    //   rootPath: join(process.cwd(), 'upload'),
    //   exclude: ['/api*']  // 排除 API 路由
    // }),
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: async (req, file, callback) => {
    //       const uploadPath = 'upload1';
    //       try {
    //         await access(uploadPath, constants.F_OK);
    //       } catch (err) {
    //         await mkdir(uploadPath, { recursive: true });
    //       }
    //       callback(null, uploadPath);
    //     },
    //     filename: (req, file, callback) => {
    //       // 生成唯一文件名
    //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //       const ext = extname(file.originalname);
    //       callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    //     },
    //   }),
    // }),
  ],
  controllers: [CommonController],
  providers: [CommonService, CaptchaService],
  exports: [CommonService, CaptchaService],
})
export class CommonModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StaticFileMiddleware)
      .forRoutes(
        { path: 'static/*', method: RequestMethod.ALL }, // 捕获所有以 /static/ 开头的请求
        { path: 'api/static/*', method: RequestMethod.ALL } // 捕获所有以 /api/static/ 开头的请求
      );
  }
}