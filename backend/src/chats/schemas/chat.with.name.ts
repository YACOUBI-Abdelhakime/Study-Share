import { Chat } from './chat.schema';

export interface ChatWithName extends Chat {
  chatName: string;
}
