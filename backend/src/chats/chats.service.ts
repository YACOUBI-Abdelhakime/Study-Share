import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WsException } from '@nestjs/websockets';
import { Model, Types } from 'mongoose';
import { AddMessageDto } from 'src/messages/dtos/add.message.dto';
import { MessageReadDto } from 'src/messages/dtos/message.read.dto';
import { MessagesService } from 'src/messages/messages.service';
import { Message } from 'src/messages/schemas/message.schema';
import { CreateChatDto } from './dtos/create.chat.dto';
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
    const userId = payload.user._id;
    const senderIdAsObjectId = Types.ObjectId.createFromHexString(userId);
    let chats: Chat[] = [];
    chats = await this.chatModel
      .find({
        participants: senderIdAsObjectId,
      })
      .sort({ updatedAt: -1 })
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 } },
      })
      .populate('participants', '-password');

    chats.map((chat) => {
      // Set chat name to the other participant's name
      chat.participants.map((participant) => {
        if (participant._id != userId) {
          chat.chatName = participant.name;
          return;
        }
      });
      // Get only unread messages
      const lastMessage = chat.messages[0] ?? null;
      const unReadMessage: Message[] = [];
      unReadMessage.push(lastMessage);
      for (let i = 1; i < chat.messages.length; i++) {
        if (
          chat.messages[i].read === false &&
          chat.messages[i].senderId != userId
        ) {
          unReadMessage.push(chat.messages[i]);
        } else {
          break;
        }
      }
      chat.messages = unReadMessage;
    });

    return chats;
  }

  async getChat(chatId: string, payload): Promise<Chat> {
    // Get user id from jwt payload
    const chatIdAsObjectId = Types.ObjectId.createFromHexString(chatId);
    const senderIdAsObjectId = Types.ObjectId.createFromHexString(
      payload.user._id,
    );

    let chat = await this.chatModel
      .findOne({
        _id: chatIdAsObjectId,
        participants: senderIdAsObjectId,
      })
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 } },
      })
      .populate('participants', '-password');

    // Set chat name to the other participant's name
    chat.participants.map((participant) => {
      if (participant._id !== payload.user._id) {
        chat.chatName = participant.name;
        return;
      }
    });

    if (!chat) {
      throw new BadRequestException('Invalid chat or participant ID.');
    }

    return chat;
  }

  /**
   * Create chat if not exists, otherwise return the existing chat
   *
   * @param createChatDto
   * @param payload
   * @returns  Chat
   */
  async createChat(createChatDto: CreateChatDto, payload): Promise<Chat> {
    // Get user id from jwt payload
    const senderIdAsObjectId = Types.ObjectId.createFromHexString(
      payload.user._id,
    );
    const receiverIdAsObjectId = Types.ObjectId.createFromHexString(
      createChatDto.receiverId,
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
        chatName: null,
        participants: participants,
        messages: [],
      };
      chat = await (
        await this.chatModel.create(newChat)
      ).populate('participants', '-password');
    }

    // Set chat name to the other participant's name
    chat.participants.map((participant) => {
      if (participant._id !== payload.user._id) {
        chat.chatName = participant.name;
        return;
      }
    });
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
    );

    // Set chat name to the other participant's name
    updatedChat.participants.map((participant) => {
      if (participant._id !== senderId) {
        updatedChat.chatName = participant.name;
        return;
      }
    });
    return updatedChat;
  }

  async messageRead(
    messageReadDto: MessageReadDto,
  ): Promise<{ chat: Chat; message: Message }> {
    const updatedMessage = await this.messagesService.messageRead(
      messageReadDto.messageId,
    );
    const messageIdAsObjectId = Types.ObjectId.createFromHexString(
      messageReadDto.messageId,
    );
    const chat = await this.chatModel
      .findOne({
        messages: messageIdAsObjectId,
      })
      .populate('participants', '-password');
    return {
      chat: chat,
      message: updatedMessage,
    };
  }
}
