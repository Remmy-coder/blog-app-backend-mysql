import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentService } from 'src/comment/comment.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { Reply } from './entities/reply.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply) private replyRepository: Repository<Reply>,
    private userService: UsersService,
    private commentService: CommentService,
  ) {}

  async create(createReplyDto: CreateReplyDto): Promise<Reply> {
    const user = await this.userService.findOneById(createReplyDto.userId);

    const comment = await this.commentService.findOneById(
      createReplyDto.commentId,
    );

    if (!user) {
      throw new ConflictException('User does not exists');
    }

    if (!comment) {
      throw new ConflictException('Post Comment does not exists');
    }

    const reply = new Reply();
    reply.content = createReplyDto.content;
    reply.user = user;
    reply.comment = comment;

    return await reply.save();
  }

  findAll() {
    return `This action returns all reply`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reply`;
  }

  update(id: number, updateReplyDto: UpdateReplyDto) {
    return `This action updates a #${id} reply`;
  }

  remove(id: number) {
    return `This action removes a #${id} reply`;
  }
}
