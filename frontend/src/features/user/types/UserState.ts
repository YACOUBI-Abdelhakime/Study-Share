import { Contact } from "./Contact";
import { User } from "./User";

export interface UserState {
  user: User | null;
  contacts: Contact[];
  isLoading: boolean;
}
