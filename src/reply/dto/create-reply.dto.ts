import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateReplyDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  commentId: number;

  comment: Comment;

  user: User;

  constructor(
    content: string,
    userId: number,
    commentId: number,
    id?: number,
    user?: User,
    comment?: Comment,
  ) {
    this.content = content;
    this.userId = userId;
    this.commentId = commentId;
    this.id = id;
    this.user = user;
    this.comment = comment;
  }
}
