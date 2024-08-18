import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from 'src/chats/schemas/chat.schema';
import { Message } from './schemas/message.schema';
import { Model, Types } from 'mongoose';
import { AddMessageDto } from './dtos/add.message.dto';
import { ChatsService } from 'src/chats/chats.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
    private readonly chatsService: ChatsService,
  ) {}

  async addMessage(addMessageDto: AddMessageDto, payload): Promise<Message> {
    // Get user id from jwt payload
    const senderIdAsObjectId = Types.ObjectId.createFromHexString(
      payload.user._id,
    );
    const chatIdAsObjectId = Types.ObjectId.createFromHexString(
      addMessageDto.chatId,
    );

    // Check if the user is a participant of the chat
    const chat: Chat | null = await this.chatsService.checkChatParticipant(
      chatIdAsObjectId,
      senderIdAsObjectId,
    );

    if (!chat) {
      // User is not a participant of the chat
      throw new BadRequestException('Invalid chat or participant ID.');
    }
    // Create new message
    const newMessage: Message = {
      senderId: senderIdAsObjectId,
      content: addMessageDto.content,
    };
    const createdMessage = await this.messageModel.create(newMessage);

    // Update chat list messages and last message date
    await this.chatsService.addMessageToChat(
      chatIdAsObjectId,
      createdMessage._id,
      createdMessage['createdAt'],
    );

    return createdMessage;
  }
}
