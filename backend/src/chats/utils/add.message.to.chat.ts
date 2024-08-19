import { Model, Types } from 'mongoose';
import { Chat } from '../schemas/chat.schema';
import { Message } from 'src/messages/schemas/message.schema';

/**
 * Append messageId to chat messages and update lastMessageAt to messageCreatedAt
 *
 * @param chatId: Types.ObjectId
 * @param messageId: Types.ObjectId
 * @param messageCreatedAt: Date
 * @returns Chat with unread messages
 */
async function addMessageToChat(
  chatModel: Model<Chat>,
  chatId: Types.ObjectId,
  messageId: Types.ObjectId,
  messageCreatedAt: Date,
): Promise<Chat> {
  const chat: Chat = await chatModel
    .findByIdAndUpdate(
      chatId,
      {
        $push: { messages: messageId },
        $set: { lastMessageAt: messageCreatedAt },
      },
      { new: true },
    )
    .populate({
      path: 'messages',
      options: { sort: { createdAt: -1 } },
    })
    .populate('participants', '-password');

  const unreadMessages: Message[] = chat.messages.filter((message: Message) => {
    return message.read === false;
  });

  chat.messages = unreadMessages;

  return chat;
}

export { addMessageToChat };
