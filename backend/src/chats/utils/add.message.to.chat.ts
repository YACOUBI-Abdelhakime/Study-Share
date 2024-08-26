import { Model, Types } from 'mongoose';
import { Chat } from '../schemas/chat.schema';
import { Message } from 'src/messages/schemas/message.schema';

/**
 * Append messageId to chat messages
 *
 * @param chatId: Types.ObjectId
 * @param messageId: Types.ObjectId
 * @returns Chat with unread messages
 */
async function addMessageToChat(
  chatModel: Model<Chat>,
  chatId: Types.ObjectId,
  messageId: Types.ObjectId,
): Promise<Chat> {
  const chat: Chat = await chatModel
    .findByIdAndUpdate(
      chatId,
      {
        $push: { messages: messageId },
      },
      { new: true },
    )
    .populate({
      path: 'messages',
      options: { sort: { createdAt: 1 } },
    })
    .populate('participants', '-password');

  return chat;
}

export { addMessageToChat };
