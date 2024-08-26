import { useSelector } from "react-redux";
import { Message } from "../../features/chat/types/schemas/Message";
import { getDateString } from "../../utils/dateFormate/dateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

export default function MessageComponent({ message }: { message: Message }) {
  const isMyMessage: boolean = useSelector((state: any) => {
    return message.senderId === state.userReducer.user._id;
  });
  return (
    <div
      className={
        isMyMessage
          ? "d-flex align-items-center justify-content-end"
          : "d-flex align-items-center justify-content-start"
      }
    >
      <div
        className={
          isMyMessage
            ? "mx-2 my-1 px-2 py-2 rounded-3 primary-message-color"
            : "mx-2 my-1 px-2 py-2 rounded-3 secondary-message-color"
        }
        style={{ maxWidth: "80%" }}
      >
        <div>
          <p className="m-0 text-start">{message.content}</p>
          <div className="d-flex justify-content-end">
            <p className="m-0 text-end font-size-11">
              {getDateString(message.createdAt)}
              {message.read && (
                <FontAwesomeIcon
                  icon={faCheckDouble}
                  size="lg"
                  className="ms-2"
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
