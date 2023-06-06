import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entities/reply.entity';
import { User } from 'src/users/entities/user.entity';
import { CommentService } from 'src/comment/comment.service';
import { UsersService } from 'src/users/users.service';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { PostService } from 'src/post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reply, Comment, Post, User])],
  controllers: [ReplyController],
  providers: [ReplyService, CommentService, UsersService, PostService],
})
export class ReplyModule {}
