import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SETTINGS } from 'src/app.utils';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Commenter)
  @Post('/create')
  async create(
    @Body(SETTINGS.VALIDATION_PIPE) createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    try {
      const comment = await this.commentService.create(createCommentDto);
      if (comment) return comment;
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async findAll() {
    const comments = this.commentService.findAll();
    return comments;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const comment = await this.commentService.findOneById(+id);
    return comment;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
