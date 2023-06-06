import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateCommentDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  postId: number;

  post: Post;

  user: User;

  constructor(
    content: string,
    userId: number,
    postId: number,
    id?: number,
    post?: Post,
    user?: User,
  ) {
    this.content = content;
    this.userId = userId;
    this.postId = postId;
    this.id = id;
    this.post = post;
    this.user = user;
  }
}
