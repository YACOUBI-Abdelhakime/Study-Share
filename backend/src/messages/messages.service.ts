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
    const chatIdAsObjectId = Types.ObjectId.createFromHexString(
      addMessageDto.chatId,
    );

    // // Check if the user is a participant of the chat
    // const chat: Chat | null = await this.chatsService.checkChatParticipant(
    //   chatIdAsObjectId,
    //   senderIdAsObjectId,
    // );

    // if (!chat) {
    //   // User is not a participant of the chat
    //   throw new BadRequestException('Invalid chat or participant ID.');
    // }
    // Create new message
    const newMessage: Message = {
      senderId: senderIdAsObjectId,
      content: addMessageDto.content,
    };
    const createdMessage = await this.messageModel.create(newMessage);

    // Update chat list messages and last message date
    // await this.chatsService.addMessageToChat(
    //   chatIdAsObjectId,
    //   createdMessage._id,
    //   createdMessage['createdAt'],
    // );

    return createdMessage;
  }
}
