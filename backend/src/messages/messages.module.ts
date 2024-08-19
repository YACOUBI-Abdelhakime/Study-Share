import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { messageSchema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: messageSchema }]),
  ],
  exports: [MessagesService],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
