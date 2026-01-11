import { Injectable } from '@nestjs/common'
import * as fs from 'node:fs/promises';
import path from 'node:path';

@Injectable()
export class SystemLogService {

  // 读取 system.log 文件日志
  async get() {
    return await fs.readFile(path.join('system.log'), 'utf8')
  }

  // 删除 system.log 文件日志
  async del() {
    return await fs.unlink(path.join('system.log'))
      .then(() => {
        return '删除成功'
      })
      .catch(() => {
        return '删除失败'
      })
  }
}
