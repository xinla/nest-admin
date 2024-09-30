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

  validateCaptcha(key: string, value: string): boolean {
    if (!key || !value) {
      return false
    }
    const storedValue = this.captchaMap.get(key)
    if (!storedValue) {
      return false
    }
    this.captchaMap.delete(key)
    return `${storedValue}`.toLowerCase() === `${value}`.toLowerCase()
  }
}
