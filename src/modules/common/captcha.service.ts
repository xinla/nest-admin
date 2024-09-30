import { Injectable } from '@nestjs/common'
import * as svgCaptcha from 'svg-captcha'

@Injectable()
export class CaptchaService {
  private captchaMap = new Map<string, string>()

  getCaptchaImage(type = 'math'): { data: string; uuid: string } {
    const captcha = svgCaptcha.createMathExpr({})
    const { data, text } = captcha
    const uuid = Math.random().toString(36).substring(2, 10)
    this.captchaMap.set(uuid, text)
    return { data, uuid }
  }

  validateCaptcha(key: string, value: string): string {
    if (!key || !value) {
      return '验证码错误'
    }
    const storedValue = this.captchaMap.get(key)
    if (!storedValue) {
      return '验证码错误'
    }
    this.captchaMap.delete(key)
    return `${storedValue}`.toLowerCase() === `${value}`.toLowerCase() ? 'true' : '验证码错误'
  }
}
