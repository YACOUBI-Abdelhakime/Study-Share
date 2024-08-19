import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WsException } from '@nestjs/websockets';
import { Model, Types } from 'mongoose';
import { AddMessageDto } from 'src/messages/dtos/add.message.dto';
import { MessagesService } from 'src/messages/messages.service';
import { AddChatDto } from './dtos/add.chat.dto';
import { Chat } from './schemas/chat.schema';
import { addMessageToChat as addMessageIdToChat } from './utils/add.message.to.chat';
import { checkChatParticipants } from './utils/check.chat.participants';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<Chat>,
    private readonly messagesService: MessagesService,
  ) {}

  async getChats(payload): Promise<Chat[]> {
    // Get user id from jwt payload
    const senderIdAsObjectId = Types.ObjectId.createFromHexString(
      payload.user._id,
    );
    let chats: Chat[] = [];
    chats = await this.chatModel
      .find({
        participants: senderIdAsObjectId,
      })
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 } },
      })
      .populate('participants', '-password');

    chats.map((chat) => {
      chat.messages = chat.messages.filter((message) => {
        return message.read === false;
      });
    });

    return chats;
  }

  async getChat(chatId: string, payload): Promise<Chat> {
    // Get user id from jwt payload
    const senderIdAsObjectId = Types.ObjectId.createFromHexString(
      payload.user._id,
    );

    let chat = await this.chatModel
      .findOne({
        _id: chatId,
        participants: senderIdAsObjectId,
      })
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 } },
      })
      .populate('participants', '-password');

    if (!chat) {
      throw new BadRequestException('Invalid chat or participant ID.');
    }

    return chat;
  }

  /**
   * Create chat if not exists, otherwise return the existing chat
   *
   * @param addChatDto
   * @param payload
   * @returns  Chat
   */
  async createChat(addChatDto: AddChatDto, payload): Promise<Chat> {
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
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 } },
      })
      .populate('participants', '-password');

    if (!chat) {
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
