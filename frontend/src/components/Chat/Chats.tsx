import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChats } from "../../features/chat/asyncThuks";
import { Chat } from "../../features/chat/types/schemas/Chat";
import { AppDispatch } from "../../features/store";
import ChatComponent from "./Chat";

export default function Chats() {
  const dispatch: AppDispatch = useDispatch();

  let chats: Chat[] = [];
  chats = useSelector((state: any) => {
    return state.chatReducer.chats;
  });

  useEffect(() => {
    dispatch(getChats());
  }, []);

  return (
    <>
      {chats.map((chat) => (
        <ChatComponent chat={chat} key={chat._id} />
      ))}
    </>
  );
}
