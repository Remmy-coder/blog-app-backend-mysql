import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByUsername(username);
      const isMatch = await bcrypt.compare(pass, user.password);
      if (user && isMatch) {
        const { password, ...result } = user;
        const payload = {
          username: user.username,
          sub: user.id,
          role: user.role,
        };

        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    } catch (error) {
      if (error) {
        console.log(error);
        throw new NotFoundException();
      }
    }
  }
}
