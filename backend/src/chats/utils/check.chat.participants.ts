import { Model, Types } from 'mongoose';
import { Chat } from '../schemas/chat.schema';

/**
 *
 * @param chatModel: Model<Chat>
 * @param chatId: Types.ObjectId
 * @param senderId: Types.ObjectId
 * @param receiverId: Types.ObjectId
 * @returns Chat | null, if chat is found and senderId participate, return chat, otherwise return null
 */
async function checkChatParticipants(
  chatModel: Model<Chat>,
  chatId: Types.ObjectId,
  senderId: Types.ObjectId,
  receiverId: Types.ObjectId,
): Promise<Chat | null> {
  const chat: Chat | null = await chatModel.findOne({
    _id: chatId,
    participants: { $all: [senderId, receiverId] },
  });
  return chat;
}

export { checkChatParticipants };
