import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AddChatDto } from './dtos/add.chat.dto';
import { Chat } from './schemas/chat.schema';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<Chat>,
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

  /**
   *
   * @param chatId: Types.ObjectId
   * @param senderId: Types.ObjectId
   * @returns Chat | null, if chat is found and senderId participate, return chat, otherwise return null
   */
  async checkChatParticipant(
    chatId: Types.ObjectId,
    senderId: Types.ObjectId,
  ): Promise<Chat | null> {
    const chat: Chat | null = await this.chatModel.findOne({
      _id: chatId,
      participants: senderId,
    });
    return chat;
  }

  /**
   *
   * @param chatId: Types.ObjectId
   * @param messageId: Types.ObjectId
   * @param messageCreatedAt: Date
   * @returns void
   */
  async addMessageToChat(
    chatId: Types.ObjectId,
    messageId: Types.ObjectId,
    messageCreatedAt: Date,
  ): Promise<void> {
    // Append messageId to chat messages and update lastMessageAt to messageCreatedAt
    await this.chatModel.findByIdAndUpdate(
      chatId,
      {
        $push: { messages: messageId },
        $set: { lastMessageAt: messageCreatedAt },
      },
      { new: true },
    );

    return;
  }
}
