import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AddChatDto } from './dtos/add.chat.dto';
import { Chat } from './schemas/chat.schema';
import { MessagesService } from 'src/messages/messages.service';
import { Message } from 'src/messages/schemas/message.schema';
import { AddMessageDto } from 'src/messages/dtos/add.message.dto';
import { checkChatParticipants } from './utils/check.chat.participants';
import { addMessageToChat as addMessageIdToChat } from './utils/add.message.to.chat';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<Chat>,
    private readonly messagesService: MessagesService,
  ) {}

  async addChat(addChatDto: AddChatDto, payload): Promise<Chat> {
    // Get user id from jwt payload
    const senderIdAsObjectId = Types.ObjectId.createFromHexString(
      payload.user._id,
    );
    const receiverIdAsObjectId = Types.ObjectId.createFromHexString(
      addChatDto.receiverId,
    );

    const participants = [senderIdAsObjectId, receiverIdAsObjectId];
    let chat = await this.chatModel
      .findOne({
        participants: { $all: participants },
      })
      .populate('messages')
      .populate('participants', '-password');

    if (chat) {
      // Chat found
    } else {
      // Chat not found, create new one
      const newChat: Chat = {
        participants: participants,
        messages: [],
        lastMessageAt: new Date(),
      };
      chat = await this.chatModel.create(newChat);
    }
    return chat;
  }

  async addChatMessage(
    addMessageDto: AddMessageDto,
    senderId: string,
  ): Promise<Chat> {
    const senderIdAsObjectId = Types.ObjectId.createFromHexString(senderId);
    const receiverIdAsObjectId = Types.ObjectId.createFromHexString(
      addMessageDto.receiverId,
    );
    const chatIdAsObjectId = Types.ObjectId.createFromHexString(
      addMessageDto.chatId,
    );
    // Check if the users are participants of the chat
    const chat: Chat | null = await checkChatParticipants(
      this.chatModel,
      chatIdAsObjectId,
      senderIdAsObjectId,
      receiverIdAsObjectId,
    );

    if (!chat) {
      // User is not a participant of the chat
      throw new WsException('Invalid chat or participant ID.');
    }

    let createdMessage = await this.messagesService.addMessage(
      addMessageDto,
      senderId,
    );

    const updatedChat: Chat = await addMessageIdToChat(
      this.chatModel,
      chatIdAsObjectId,
      createdMessage._id,
      createdMessage['createdAt'],
    );
    return updatedChat;
  }
}
