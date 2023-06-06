import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreatePostDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  article: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  user: User;

  likeCount: string[];

  constructor(
    title: string,
    article: string,
    userId: number,
    user?: User,
    id?: number,
    likeCount?: string[],
  ) {
    this.id = id;
    this.title = title;
    this.article = article;
    this.userId = userId;
    this.user = user;
    this.likeCount = likeCount;
  }
}
