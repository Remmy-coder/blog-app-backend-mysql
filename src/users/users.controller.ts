import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  ConflictException,
  UseInterceptors,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SETTINGS } from 'src/app.utils';
import { SerializedUser } from './entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  async create(@Body(SETTINGS.VALIDATION_PIPE) createUserDto: CreateUserDto) {
    try {
      // const newUser = await this.userService.create(createUserDto);
      const user = await this.usersService.userRegistration(createUserDto);
      if (user) return new SerializedUser(user);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get('all')
  async findAll() {
    const users = this.usersService.findAll();
    const usersWithoutPasswords = (await users).map((user) => {
      return Object.assign({}, user, { password: String });
    });
    return usersWithoutPasswords;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Get('getUserBy/:username')
  async findOneEmail(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user) return new SerializedUser(user);
    else throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
