import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Comment } from "../../features/comment/types/Comment";
import { getDateString } from "../../utils/dateFormate/dateFormat";

export default function CommentComponent({ comment }: { comment: Comment }) {
  let myUserId: string = useSelector((state: any) => {
    return state.userReducer.user._id;
  });
  let isMyComment: boolean = comment.userId === myUserId;
  return (
    <div className={isMyComment ? "card mt-2 bg-light" : "card mt-2"}>
      <div className="card-body pt-2 pb-1">
        <div
          className={
            isMyComment
              ? "d-flex align-items-center justify-content-end"
              : "d-flex align-items-center justify-content-start"
          }
        >
          <div
            className={
              isMyComment
                ? "d-flex align-items-center justify-content-start flex-row-reverse"
                : "d-flex align-items-center justify-content-start"
            }
            role="button"
          >
            <FontAwesomeIcon
              icon={faCircleUser}
              size="2x"
              style={{ color: "#c2bdbd" }}
            />
            <div className="mx-2">
              <p
                className={
                  isMyComment
                    ? "my-0 text-end fw-bold"
                    : "my-0 text-start fw-bold"
                }
              >
                {comment.userName}
              </p>
              <p
                className={isMyComment ? "my-0 text-end" : "my-0 text-start"}
                style={{ fontSize: "11px" }}
              >
                {getDateString(comment.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body pt-0 pb-2">
        <p className="card-text">{comment.content}</p>
      </div>
    </div>
  );
}
