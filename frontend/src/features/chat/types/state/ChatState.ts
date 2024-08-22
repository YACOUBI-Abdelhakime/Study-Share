import { Socket } from "socket.io-client";
import { Chat } from "../schemas/Chat";

export interface ChatState {
  chats: Chat[];
  socket: Socket | null;
  isLoading: boolean;
}
