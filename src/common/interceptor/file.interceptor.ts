import { UseInterceptors } from '@nestjs/common'
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { mkdir } from 'fs'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import dayjs from 'dayjs'

export function MulterFileInterceptor(subDir = 'default', formats = ['*'], fileMaxSize = Math.pow(1024, 2) * 20) {
  return UseInterceptors(
    FileInterceptor('file', {
      // AnyFilesInterceptor({
      limits: { fileSize: fileMaxSize },
      fileFilter(req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) {
        let ext = file.originalname.split('.').at(-1)
        if (formats[0] === '*' || formats.includes(ext)) {
          callback(null, true)
        } else {
          callback(new Error('文件格式不支持'), false)
        }

        // let isSize = file.size < fileMaxSize
        // if (isSize) {
        //   callback(null, true)
        // } else {
        //   callback(new Error(`上传文件大小不能超过 ${fileMaxSize} MB!`), false)
        // }
      },
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, join('src/upload'))
        },
        filename: async function (req, file, cb) {
          let dirGroup = dayjs().format('YYYY-MM-DD')
          // let dirGroup = file.originalname.split('.').at(-1)
          let fileDir = join(subDir, req.body.module || '', dirGroup)
          try {
            // await access(
            //   'src/upload/' + dayjs().format('YYYY-MM-DD'),
            //   constants.R_OK | constants.W_OK,
            // )
            await mkdir(join('src/upload', fileDir), { recursive: true }, () => {})
          } catch (error) {
            throw error
            // console.error(error.message)
          }
          let filename = `${fileDir}/${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`
          filename = join(fileDir, filename)
          cb(null, filename)
        },
      }),
    }),
  )
}
