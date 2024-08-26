import { Chat } from "../schemas/Chat";

export interface ChatState {
  chats: Chat[];
  selectedChatId: string;
  selectedChat: Chat | null;
  isLoading: boolean;
}
