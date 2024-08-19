import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/config/guards/jwt.auth.guard';
import { ChatsService } from './chats.service';
import { AddChatDto } from './dtos/add.chat.dto';
import { Chat } from './schemas/chat.schema';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  // @Get('/:id')
  // @UseGuards(JwtAuthGuard)
  // async GetChat(
  //   @Body() newChatDto: AddChatDto,
  //   @Req() req: Request,
  // ): Promise<Chat> {
  //   // return await this.chatsService.addChat(newChatDto, req.user);
  // }

  // @Post('/')
  // @UseGuards(JwtAuthGuard)
  // async AddChat(
  //   @Body() newChatDto: AddChatDto,
  //   @Req() req: Request,
  // ): Promise<Chat> {
  //   return await this.chatsService.addChat(newChatDto, req.user);
  // }
}
