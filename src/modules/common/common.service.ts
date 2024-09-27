import { Injectable } from '@nestjs/common'
import { CreateCommonDto } from './dto/create-common.dto'
import { UpdateCommonDto } from './dto/update-common.dto'
import * as os from 'os'
import * as fs from 'node:fs/promises'

@Injectable()
export class CommonService {
  async getOsInfo() {
    let data = {
      // 获取系统平台信息，例如 'win32', 'darwin' 等
      platform: os.platform(),
      // 获取系统发行版本
      release: os.release(),
      // 获取系统总内存大小，以字节为单位
      mem: {
        // 获取系统剩余内存大小，以字节为单位
        totalMemory: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
        freeMemory: (os.freemem() / 1024 / 1024 / 1024).toFixed(2),
        usedMemory: ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2),
      },
      // 获取系统CPU信息，包括CPU的型号和架构等
      cpu: this.getCpuUsage(),
      ip: this.getLocalIP(),
      disk: await this.getDiskSpace(),
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

  getLocalIP() {
    const networkInterfaces = os.networkInterfaces()
    const ipv4Addresses = []

    for (const name in networkInterfaces) {
      const iface = networkInterfaces[name]
      for (const addressInfo of iface) {
        if (!addressInfo.internal && addressInfo.family === 'IPv4') {
          ipv4Addresses.push(addressInfo.address)
        }
      }
    }

    return ipv4Addresses[0]
  }

  getCpuUsage() {
    const cpus = os.cpus()
    let freeCpu = 0
    let totalCpu = 0

    cpus.forEach((cpu) => {
      for (const type in cpu.times) {
        totalCpu += cpu.times[type]
      }
      freeCpu += cpu.times.idle
    })

    let _freeCpu = ((100 * freeCpu) / totalCpu).toFixed(2)
    return {
      totalCpu: 100,
      freeCpu: _freeCpu,
      usedCpu: (100 - +_freeCpu).toFixed(2),
    }
  }

  async getDiskSpace() {
    const platform = os.platform()
    let diskPath = ''

    if (platform === 'win32') {
      // Windows 系统
      diskPath = 'c:'
    } else if (platform === 'darwin' || platform === 'linux') {
      // macOS 或 Linux 系统
      diskPath = '/'
    } else {
      console.error('Unsupported platform:', platform)
      return
    }

    try {
    } catch (error) {
      console.error('Error getting disk space:', error)
    }
    let stats = await fs.statfs(diskPath)
    let totalDisk = stats.blocks * stats.bsize
    let freeDisk = stats.bavail * stats.bsize
    let usedDisk = totalDisk - freeDisk
    return {
      totalDisk: (totalDisk / 1024 / 1024 / 1024).toFixed(2),
      freeDisk: (freeDisk / 1024 / 1024 / 1024).toFixed(2),
      usedDisk: (usedDisk / 1024 / 1024 / 1024).toFixed(2),
    }
  }
}
