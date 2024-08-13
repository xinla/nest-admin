import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Req,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('system/common')
export class CommonController {
  // constructor(private readonly commonService: CommonService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: Math.pow(1024, 2) * 2 },
      fileFilter(req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) {
        if (!file.mimetype.includes('image')) {
          callback(new Error('类型不支持'), false)
        } else {
          callback(null, true)
        }
      },
    }),
  )
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return file.filename
  }
}
