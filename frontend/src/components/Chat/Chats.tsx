import { useDispatch, useSelector } from "react-redux";
import { Chat } from "../../features/chat/types/schemas/Chat";
import { AppDispatch } from "../../store";
import ChatComponent from "./Chat";
import { useEffect } from "react";
import { getChats } from "../../features/chat/asyncThuks";

export default function Chats() {
  const dispatch: AppDispatch = useDispatch();
  let chats: Chat[] = [];
  // [
  //   {
  //     _id: "66c140f9bff74a5e01156674",
  //     chatName: "Alexandre_MARTINE",
  //     participants: [
  //       {
  //         _id: "66b643f595b9ef16f028f80c",
  //         name: "Abdel Hakime",
  //         dateOfBirth: "2000-05-20",
  //         isVerified: false,
  //         email: "abdel@gmail.com",
  //         token: "xyz",
  //       },
  //       {
  //         _id: "66b66722f8930d208a3d4d19",
  //         name: "Alexandre_MARTINE",
  //         dateOfBirth: "2018-07-31",
  //         isVerified: false,
  //         email: "alex@gmail.com",
  //         token: "xyz",
  //       },
  //     ],
  //     messages: [
  //       {
  //         _id: "66c3c90f15811f799932ad54",
  //         senderId: "66b66722f8930d208a3d4d19",
  //         content: "how old are you?",
  //         read: false,
  //         createdAt: "2024-08-19T22:39:03.938Z",
  //       },
  //       {
  //         _id: "66c3c90f15811f799932ad54",
  //         senderId: "66b66722f8930d208a3d4d19",
  //         content: "I have a question",
  //         read: false,
  //         createdAt: "2024-08-19T22:39:03.938Z",
  //       },
  //       {
  //         _id: "66c3c4ffc5d046e25e47780d",
  //         senderId: "66b643f595b9ef16f028f80c",
  //         content: "I'm fine too, thanks",
  //         read: false,
  //         createdAt: "2024-08-19T22:40:43.641Z",
  //       },
  //       {
  //         _id: "66c3c90f15811f799932ad54",
  //         senderId: "66b66722f8930d208a3d4d19",
  //         content: "I'm fine, and you?",
  //         read: false,
  //         createdAt: "2024-08-19T22:39:03.938Z",
  //       },
  //       {
  //         _id: "66c3c4ffc5d046e25e47780d",
  //         senderId: "66b643f595b9ef16f028f80c",
  //         content: "How are you?",
  //         read: false,
  //         createdAt: "2024-08-19T22:38:43.641Z",
  //       },
  //       {
  //         _id: "66c3c90f15811f799932ad54",
  //         senderId: "66b66722f8930d208a3d4d19",
  //         content: "Hello Abdel Hakime",
  //         read: false,
  //         createdAt: "2024-08-19T22:37:03.938Z",
  //       },
  //     ],
  //     updatedAt: "2024-08-19T22:37:03.940Z",
  //   },
  //   {
  //     _id: "66c140f9bff74a5e01156675",
  //     chatName: "Hakim YACOUBI",
  //     participants: [
  //       {
  //         _id: "66b643f595b9ef16f028f80c",
  //         name: "Abdel Hakime",
  //         dateOfBirth: "2000-05-20",
  //         isVerified: false,
  //         email: "abdel@gmail.com",
  //         token: "xyz",
  //       },
  //       {
  //         _id: "66c20a888da79dc8e5f1e6f5",
  //         name: "Hakim YACOUBI",
  //         dateOfBirth: "2018-07-31",
  //         isVerified: false,
  //         email: "hakim@gmail.com",
  //         token: "xyz",
  //       },
  //     ],
  //     messages: [
  //       {
  //         _id: "66c3c4ffc5d046e25e47780d",
  //         senderId: "66b66722f8930d208a3d4d19",
  //         content: "I'm fine too, thanks x",
  //         read: true,
  //         createdAt: "2024-08-19T22:40:43.641Z",
  //       },
  //       {
  //         _id: "66c3c90f15811f799932ad54",
  //         senderId: "66b66722f8930d208a3d4d19",
  //         content: "I'm fine, and you? x",
  //         read: true,
  //         createdAt: "2024-08-19T22:39:03.938Z",
  //       },
  //       {
  //         _id: "66c3c4ffc5d046e25e47780d",
  //         senderId: "66b66722f8930d208a3d4d19",
  //         content: "How are you? x",
  //         read: true,
  //         createdAt: "2024-08-19T22:38:43.641Z",
  //       },
  //       {
  //         _id: "66c3c90f15811f799932ad54",
  //         senderId: "66b66722f8930d208a3d4d19",
  //         content: "Hello Hakime x",
  //         read: true,
  //         createdAt: "2024-08-19T22:37:03.938Z",
  //       },
  //     ],
  //     updatedAt: "2024-08-19T22:37:03.940Z",
  //   },
  // ];
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
