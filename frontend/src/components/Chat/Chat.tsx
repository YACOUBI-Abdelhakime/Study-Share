import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSelectedChat } from "../../features/chat/chatSlice";
import { Chat } from "../../features/chat/types/schemas/Chat";
import { AppDispatch } from "../../features/store";
import { getDateString } from "../../utils/dateFormate/dateFormat";

export default function ChatComponent({ chat }: { chat: Chat }) {
  const dispatch: AppDispatch = useDispatch();
  const userId: string = useSelector((state: any) => {
    return state.userReducer.user._id;
  });
  const [lastMessage, setLastMessage] = useState({
    content: "",
    wasRead: true,
    unreadMessages: 0,
  });
  const getLastMessage = (chat: Chat, userId: string) => {
    const reversedMessages = [...chat.messages].reverse();
    const message = reversedMessages[0];
    let messageContent: string;
    let wasRead: boolean = true;
    let messagesNotRead: number = 0;
    if (!message) {
      messageContent = "";
    } else {
      if (message.senderId === userId) {
        messageContent = "Vous: " + message.content;
        wasRead = true;
      } else {
        messageContent = message.content;
        if (!message.read) {
          wasRead = false;
        }
        // Count messages not read
        for (const message of reversedMessages) {
          if (message.senderId !== userId && !message.read) {
            messagesNotRead++;
          } else {
            break;
          }
        }
      }
    }

    setLastMessage({
      content: messageContent,
      wasRead,
      unreadMessages: messagesNotRead,
    });
  };
  useEffect(() => {
    getLastMessage(chat, userId);
  }, [chat]);

  const onChatClicked = () => {
    dispatch(onSelectedChat(chat._id));
  };
  return (
    <div
      className="m-1 bg-white px-3 py-2"
      role="button"
      onClick={onChatClicked}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start">
          <FontAwesomeIcon
            icon={faCircleUser}
            size="2x"
            style={{ color: "#c2bdbd" }}
          />
          <div className="mx-2">
            <p className="my-0 text-start fw-bold">{chat.chatName}</p>
            <p
              className={
                lastMessage.wasRead
                  ? "my-0 text-start font-size-11"
                  : "my-0 fw-bold text-start font-size-11"
              }
            >
              {lastMessage.content}
            </p>
          </div>
        </div>
        <div>
          <div>
            <p className="m-0 font-size-11">{getDateString(chat.updatedAt)}</p>
          </div>
          {lastMessage.unreadMessages > 0 && (
            <div className="d-flex align-items-center justify-content-end">
              <p className="m-0 badge bg-primary rounded-pill ">
                {lastMessage.unreadMessages}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
