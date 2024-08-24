import { Chat } from "../schemas/Chat";

export interface ChatState {
  chats: Chat[];
  isLoading: boolean;
}
