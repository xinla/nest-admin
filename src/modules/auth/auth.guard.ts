import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { RedisService } from '../global/redis.service'
import { config } from 'config'
import { MenuType } from '../menus/menu.entity'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(config.isPublicKey, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      // 💡 See this condition
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    let payload
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwtSecret,
      })
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      payload.session = token.split('.').at(-1)
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }

    // 按钮/接口权限校验
    let permissions = await this.redisService.getPermissions()
    let api = request.path.replace(config.apiBase, '').replace(/^\//g, '')
    if (payload.permissions?.[0] !== '*' && permissions.includes(api) && !payload.permissions?.includes(api)) {
      throw new HttpException('接口无权限', 403)
    }
    await this.redisService.setRedisOnlineUser(request, payload)

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
