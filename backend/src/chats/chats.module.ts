import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { chatSchema } from './schemas/chat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: chatSchema }])],
  exports: [ChatsService],
  providers: [ChatsGateway, ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
