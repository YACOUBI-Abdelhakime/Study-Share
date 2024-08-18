import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from 'src/config/guards/jwt.auth.guard';
import { AddMessageDto } from './dtos/add.message.dto';
import { Message } from './schemas/message.schema';
import { Request } from 'express';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async AddComment(
    @Body() newChatDto: AddMessageDto,
    @Req() req: Request,
  ): Promise<Message> {
    return await this.messagesService.addMessage(newChatDto, req.user);
  }
}
