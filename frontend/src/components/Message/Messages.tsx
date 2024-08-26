import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedChat } from "../../features/chat/asyncThuks";
import { Chat } from "../../features/chat/types/schemas/Chat";
import { AppDispatch } from "../../features/store";
import MessageComponent from "./Message";
import MessageInput from "./MessageInput";
import "./Messages.css";

export default function Messages() {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const messagesScrollbarRef = useRef<HTMLDivElement>(null);
  const chat: Chat = useSelector((state: any) => {
    return state.chatReducer.selectedChat;
  });
  const userId = useSelector((state: any) => {
    return state.userReducer.user._id;
  });
  const selectedChatId = useSelector((state: any) => {
    return state.chatReducer.selectedChatId;
  });

  const getReceiverId = (chat: Chat) => {
    return chat.participants.filter((member) => member._id !== userId)[0]._id;
  };

  useEffect(() => {
    if (selectedChatId) {
      dispatch(getSelectedChat());
    }
  }, [selectedChatId]);

  useEffect(() => {
    if (messagesScrollbarRef.current) {
      messagesScrollbarRef.current.scrollTop =
        messagesScrollbarRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <>
      {chat ? (
        <div className="h-100">
          {chat.messages.length > 0 ? (
            <div
              ref={messagesScrollbarRef}
              className="messages-body-height-100 overflow-auto hide-scrollbar"
            >
              {chat.messages.map((message) => (
                <MessageComponent message={message} key={message._id} />
              ))}
            </div>
          ) : (
            <div className="messages-body-height-100 overflow-auto hide-scrollbar d-flex justify-content-center align-items-center">
              <p className="text-muted text-center mx-3">{t("noMessageYet")}</p>
            </div>
          )}
          <div className="position-relative message-input-height">
            <MessageInput chatId={chat._id} receiverId={getReceiverId(chat)} />
          </div>
        </div>
      ) : (
        <div className="panel-body-height-100 d-flex justify-content-center align-items-center">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="2x"
            style={{ color: "#5cdb95" }}
          />
        </div>
      )}
    </>
  );
}
