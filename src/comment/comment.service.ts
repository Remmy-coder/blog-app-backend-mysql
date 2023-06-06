import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private userService: UsersService,
    private postService: PostService,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const user = await this.userService.findOneById(createCommentDto.userId);

    const post = await this.postService.findOneById(createCommentDto.postId);

    if (!user) {
      throw new ConflictException('User does not exists');
    }

    if (!post) {
      throw new ConflictException('Post does bot exists');
    }

    const comment = new Comment();
    comment.content = createCommentDto.content;
    comment.user = user;
    comment.post = post;

    return await comment.save();
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find({
      relations: {
        post: true,
        user: true,
      },
    });
  }

  async findOneById(id: number): Promise<Comment> {
    const options: any = { id };
    const entity = await this.commentRepository.findOne({
      where: options,
      relations: {
        user: true,
        post: true,
      },
    });
    return entity;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
