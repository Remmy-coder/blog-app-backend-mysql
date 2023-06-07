import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ConflictException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SETTINGS } from 'src/app.utils';
import { Post as PostEntity, SerializedPost } from './entities/post.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Author)
  @Post('/create')
  async create(
    @Body(SETTINGS.VALIDATION_PIPE) createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    try {
      const post = await this.postService.create(createPostDto);
      if (post) return new SerializedPost(post);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Title already exists');
      }
    }
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async findAll() {
    const posts = this.postService.findAll();
    // const postWithoutUserPassword = (await posts).map((post) => {
    //   return Object.assign({}, post, { password: String });
    // });
    return posts;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postService.findOneById(+id);
    return post;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
