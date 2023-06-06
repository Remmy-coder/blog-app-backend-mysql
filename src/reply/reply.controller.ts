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
import { ReplyService } from './reply.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { SETTINGS } from 'src/app.utils';
import { Reply } from './entities/reply.entity';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async create(
    @Body(SETTINGS.VALIDATION_PIPE) createReplyDto: CreateReplyDto,
  ): Promise<Reply> {
    try {
      const reply = await this.replyService.create(createReplyDto);
      if (reply) return reply;
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  findAll() {
    return this.replyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.replyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
    return this.replyService.update(+id, updateReplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.replyService.remove(+id);
  }
}
