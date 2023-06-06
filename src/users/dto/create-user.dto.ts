import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { MESSAGES, REGEX } from 'src/app.utils';
import { Role } from 'src/auth/roles/role.enum';

export class CreateUserDto {
  id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsNotEmpty()
  role: Role[];

  constructor(role: Role[], email: string, password: string, id?: number) {
    this.role = role;
    this.email = email;
    this.password = password;
    this.id = id;
  }
}
