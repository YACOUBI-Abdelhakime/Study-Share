import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/config/guards/jwt.auth.guard';
import { ChatsService } from './chats.service';
import { AddChatDto } from './dtos/add.chat.dto';
import { Chat } from './schemas/chat.schema';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async GetChats(@Req() req: Request): Promise<Chat[]> {
    return await this.chatsService.getChats(req.user);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async GetChat(
    @Param('id') chatId: string,
    @Req() req: Request,
  ): Promise<Chat> {
    return await this.chatsService.getChat(chatId, req.user);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async AddChat(
    @Body() newChatDto: AddChatDto,
    @Req() req: Request,
  ): Promise<Chat> {
    return await this.chatsService.createChat(newChatDto, req.user);
  }
}
