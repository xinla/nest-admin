import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { decrypt } from 'src/common/utils/encrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(account: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.getOne({ name: account })

    if (user?.password !== (await decrypt(password))) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.id, account: user.name }
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
