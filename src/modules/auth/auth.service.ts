import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne({ name: username })
    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.id, username: user.name }
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
