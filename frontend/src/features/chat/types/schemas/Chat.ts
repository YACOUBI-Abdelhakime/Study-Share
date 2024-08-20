import { User } from "../../../user/types/User";
import { Message } from "./Message";

export interface Chat {
  _id: string;
  chatName: string;
  participants: User[];
  messages: Message[];
  updatedAt: string;
}
