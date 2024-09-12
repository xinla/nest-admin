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
  UploadedFiles,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CommonService } from './common.service'
import { MulterFileInterceptor } from 'src/common/interceptor/file.interceptor'

@Controller('system/common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  /**
   * 通用文件上传
   * @param module 文件所属模块，用于创建模块文件夹
   * @param file 文件字段
   * @returns
   */
  @Post('upload')
  @MulterFileInterceptor()
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { url: file.filename }
  }

  @Get('getOsInfo')
  async getOsInfo() {
    return await this.commonService.getOsInfo()
  }
}
