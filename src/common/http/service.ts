import { HttpService as HttpService1 } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HttpService {
  constructor(private readonly httpService: HttpService1) {}

  async get(url: string, params, options?: any) {
    return this.httpService.get(url, { params, ...options })
  }

  async post(url: string, data: any, options?: any) {
    return this.httpService.post(url, data, options)
  }

  async put(url: string, data: any, options?: any) {
    return this.httpService.put(url, data, options)
  }

  async delete(url: string, params, options?: any) {
    return this.httpService.delete(url, { params, ...options })
  }
}
