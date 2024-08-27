import { Injectable } from '@nestjs/common'
import { CreateCommonDto } from './dto/create-common.dto'
import { UpdateCommonDto } from './dto/update-common.dto'
import * as os from 'os'

@Injectable()
export class CommonService {
  async getOsInfo() {
    let data = {
      // 获取系统平台信息，例如 'win32', 'darwin' 等
      platform: os.platform(),
      // 获取系统发行版本
      release: os.release(),
      // 获取系统总内存大小，以字节为单位
      totalMemory: os.totalmem() / 1024 / 1024,
      // 获取系统剩余内存大小，以字节为单位
      freeMemory: os.freemem() / 1024 / 1024,
      // 获取系统CPU信息，包括CPU的型号和架构等
      cpus: os.cpus(),
      // 获取系统负载平均值，通常包括1分钟、5分钟和15分钟的平均值
      loadAverage: os.loadavg(),
      // 获取当前用户的用户信息，包括用户名、UID等
      userInfo: os.userInfo(),
      // 获取系统的网络接口信息，包括网络接口名称、地址等
      networkInterfaces: os.networkInterfaces(),
      // 获取系统的主机名
      hostname: os.hostname(),
      // 获取系统的CPU架构
      arch: os.arch(),
    }
    return data
  }

  create(createCommonDto: CreateCommonDto) {
    return 'This action adds a new common'
  }

  findAll() {
    return `This action returns all common`
  }

  findOne(id: number) {
    return `This action returns a #${id} common`
  }

  update(id: number, updateCommonDto: UpdateCommonDto) {
    return `This action updates a #${id} common`
  }

  remove(id: number) {
    return `This action removes a #${id} common`
  }
}
