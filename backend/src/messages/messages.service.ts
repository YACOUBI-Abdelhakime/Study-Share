import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AddMessageDto } from './dtos/add.message.dto';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}

  async addMessage(
    addMessageDto: AddMessageDto,
    senderId: string,
  ): Promise<
    Message & {
      _id: Types.ObjectId;
    }
  > {
    const senderIdAsObjectId = Types.ObjectId.createFromHexString(senderId);
    // Create new message
    const newMessage: Message = {
      senderId: senderIdAsObjectId,
      content: addMessageDto.content,
      read: false,
    };
    const createdMessage = await this.messageModel.create(newMessage);

    return createdMessage;
  }
}
