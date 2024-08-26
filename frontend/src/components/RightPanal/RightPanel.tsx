import { faArrowLeft, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { onSelectedChat } from "../../features/chat/chatSlice";
import { AppDispatch } from "../../features/store";
import { User } from "../../features/user/types/User";
import Chats from "../Chat/Chats";
import Messages from "../Message/Messages";
import "./RightPanel.css";

export default function RightPanel() {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const selectedChatId = useSelector((state: any) => {
    return state.chatReducer.selectedChatId;
  });
  const receiverName = useSelector((state: any) => {
    const userId = state.userReducer.user._id;
    const chat = state.chatReducer.chats.find(
      (chat: any) => chat._id === selectedChatId
    );
    if (!chat) {
      return "";
    }
    return chat.participants.filter((member: User) => member._id !== userId)[0]
      .name;
  });

  const onReturnToChatsClicked = () => {
    dispatch(onSelectedChat(""));
  };

  return (
    <div className="h-100 border-start">
      <div className="h-100 bg-light">
        <div className="w-100 bg-light border-bottom panel-header-height-100">
          {selectedChatId ? (
            <div className="d-flex align-items-center">
              <div role="button" onClick={onReturnToChatsClicked}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size="lg"
                  className="mx-4"
                />
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  size="2x"
                  style={{ color: "#c2bdbd" }}
                  className="me-2"
                />
              </div>
              <div>
                <span className="h5">{receiverName}</span>
              </div>
            </div>
          ) : (
            <span className="h5 mx-2">{t("messages")}</span>
          )}
        </div>
        <div>{selectedChatId ? <Messages /> : <Chats />}</div>
      </div>
    </div>
  );
}
