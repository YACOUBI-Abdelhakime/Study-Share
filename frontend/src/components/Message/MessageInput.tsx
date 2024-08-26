import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../features/store";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../features/chat/asyncThuks";
import { useContext, useRef } from "react";
import { WebSocketContext } from "../../App";

export default function MessageInput({
  chatId,
  receiverId,
}: {
  chatId: string;
  receiverId: string;
}) {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const { socket } = useContext(WebSocketContext);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const onSendMessageClicked = (e: any) => {
    e.preventDefault();
    let message: string = e.target["message"].value.trim();
    if (messageInputRef.current) {
      messageInputRef.current.value = "";
    }
    if (!message) {
      if (messageInputRef.current) {
        messageInputRef.current.value = "";
        messageInputRef.current.focus();
      }
      return;
    }
    dispatch(
      sendMessage({
        socket: socket,
        sendMessageDto: {
          chatId: chatId,
          receiverId: receiverId,
          content: message,
        },
      })
    );
  };
  return (
    <div className="message-input-height p-2 bg-white d-flex align-items-center justify-content-end fixed-bottom position-absolute">
      <form onSubmit={onSendMessageClicked} className="w-100">
        <div className="input-group">
          <input
            type="text"
            name="message"
            className="form-control"
            placeholder={t("messagePlaceholder")}
            ref={messageInputRef}
          />
          <button className="btn btn-primary text-white">{t("send")}</button>
        </div>
      </form>
    </div>
  );
}
