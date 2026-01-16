import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import * as fs from 'node:fs/promises'
import path from 'node:path'

@Injectable()
export class SystemLogService {
  // 读取 log 文件日志
  async get() {
    return await fs.readFile(path.join(`log/${dayjs().format('YYYY-MM-DD')}.log`), 'utf8')
  }

  // 删除 log 文件日志
  async del() {
    return await fs.unlink(path.join(`log/${dayjs().format('YYYY-MM-DD')}.log`)).then(() => {
      return '删除成功'
    })
  }
}
