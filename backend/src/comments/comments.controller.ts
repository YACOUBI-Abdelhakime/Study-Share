import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './schemas/comment.schema';
import { AddCommentDto } from './dtos/add.comment.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/config/guards/jwt.auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get('/publication/:publicationId')
  @UseGuards(JwtAuthGuard)
  async getComments(
    @Param('publicationId') publicationId: string,
  ): Promise<Comment[]> {
    return await this.commentService.getPublicationComments(publicationId);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async AddComment(
    @Body() comment: AddCommentDto,
    @Req() req: Request,
  ): Promise<Comment> {
    return await this.commentService.addComment(comment, req.user);
  }
}
