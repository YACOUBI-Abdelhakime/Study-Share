import { useSelector } from "react-redux";
import { Message } from "../../features/chat/types/schemas/Message";
import { getDateString } from "../../utils/dateFormate/dateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

export default function MessageComponent({ message }: { message: Message }) {
  const userId = useSelector((state: any) => {
    return state.userReducer.user._id;
  });
  return (
    <div
      className={
        message.senderId === userId
          ? "d-flex align-items-center justify-content-end"
          : "d-flex align-items-center justify-content-start"
      }
    >
      <div
        className="bg-info  mx-2 my-1 px-2 py-2 rounded-3"
        style={{ maxWidth: "80%" }}
      >
        <div className="">
          <p className="m-0 text-start fw-bold">{message.content}</p>
          <div className="d-flex justify-content-end">
            <p className="m-0 text-end font-size-11">
              {getDateString(message.createdAt)}
              {message.read && (
                <FontAwesomeIcon
                  icon={faCheckDouble}
                  size="1x"
                  className="ms-2"
                  // style={{ color: "#5cdb95" }}
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
