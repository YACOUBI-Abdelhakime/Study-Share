import { Model, Types } from 'mongoose';
import { Chat } from '../schemas/chat.schema';

/**
 * Append messageId to chat messages and update lastMessageAt to messageCreatedAt
 *
 * @param chatId: Types.ObjectId
 * @param messageId: Types.ObjectId
 * @param messageCreatedAt: Date
 * @returns void
 */
async function addMessageToChat(
  chatModel: Model<Chat>,
  chatId: Types.ObjectId,
  messageId: Types.ObjectId,
  messageCreatedAt: Date,
): Promise<Chat> {
  let chat: Chat = await chatModel
    .findByIdAndUpdate(
      chatId,
      {
        $push: { messages: messageId },
        $set: { lastMessageAt: messageCreatedAt },
      },
      { new: true },
    )
    .populate('messages')
    .populate('participants', '-password');

  return chat;
}

export { addMessageToChat };
