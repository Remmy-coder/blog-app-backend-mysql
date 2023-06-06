import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../role.enum';
import { ROLES_KEY } from '../roles.decorator';
import jwt_decode from 'jwt-decode';

interface UserDetail {
  email: string;
  sub: number;
  name: string;
  role: Array<Role>;
  iat: number;
  exp: number;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async decodeJwt(token: string): Promise<UserDetail> {
    try {
      const decoded: UserDetail = await jwt_decode(token);
      // const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log(JSON.stringify(context.switchToHttp().getRequest()));
    const requiredRoles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    const token = authHeader.split(' ')[1];

    // const userDetail = this.decodeJwt(token).then((result) => {
    //   console.log(result);
    // });

    const trial = await this.decodeJwt(token);

    return requiredRoles.some((role) => trial.role.includes(role));
  }
}
