import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChats } from "../../features/chat/asyncThuks";
import { Chat } from "../../features/chat/types/schemas/Chat";
import { AppDispatch } from "../../features/store";
import ChatComponent from "./Chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function Chats() {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const chats: Chat[] = useSelector((state: any) => {
    return state.chatReducer.chats;
  });

  useEffect(() => {
    dispatch(getChats());
  }, []);

  if (chats.length === 0) {
    return (
      <div className="h-100 bg-light">
        <div className="panel-body-height-100 d-flex justify-content-center align-items-center">
          <p className="text-muted text-center mx-3">{t("noMessageYet")}</p>
        </div>
      </div>
    );
  } else if (chats) {
    return (
      <div className="h-100 bg-light">
        <div className="panel-body-height-100 overflow-auto hide-scrollbar">
          {chats.map((chat) => (
            <ChatComponent chat={chat} key={chat._id} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-100 bg-light">
        <div className="panel-body-height-100 d-flex justify-content-center align-items-center">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="2x"
            style={{ color: "#5cdb95" }}
          />
        </div>
      </div>
    );
  }

  // return (
  //   <div className="h-100 bg-light">
  //     {chats ? (
  //       <div className="panel-body-height-100 overflow-auto hide-scrollbar">
  //         {chats.map((chat) => (
  //           <ChatComponent chat={chat} key={chat._id} />
  //         ))}
  //       </div>
  //     ) : (
  //       <div className="panel-body-height-100 d-flex justify-content-center align-items-center">
  //         <FontAwesomeIcon
  //           icon={faSpinner}
  //           spin
  //           size="2x"
  //           style={{ color: "#5cdb95" }}
  //         />
  //       </div>
  //     )}
  //   </div>
  // );
}
