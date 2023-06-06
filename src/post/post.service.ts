import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.userService.findOneById(createPostDto.userId);

    if (!user) {
      throw new ConflictException('User does not exists');
    }
    const post = new Post();
    post.title = createPostDto.title;
    post.article = createPostDto.article;
    post.user = user;

    return await post.save();
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOneById(id: number): Promise<Post> {
    const options: any = { id };
    const entity = await this.postRepository.findOne({
      where: options,
      relations: {
        user: true,
        comments: true,
      },
    });
    return entity;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
