import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async userRegistration(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.role = createUserDto.role;

    return await user.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        posts: true,
        comments: true,
      },
    });
  }

  async findOneByUsername(username): Promise<User> {
    const options: any = { username };
    const entity = await this.userRepository.findOne({
      where: options,
      relations: {
        posts: true,
        comments: true,
      },
    });

    return entity;
  }

  async findOneById(id: number): Promise<User> {
    const options: any = { id };
    const entity = await this.userRepository.findOne({
      where: options,
    });

    return entity;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
