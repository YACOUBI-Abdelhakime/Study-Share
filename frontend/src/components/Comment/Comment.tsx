import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from "../../features/comment/types/Comment";
import { getDateString } from "../../utils/dateFormate/dateFormat";
import { createChat } from "../../features/chat/asyncThuks";
import { AppDispatch } from "../../features/store";
import { useNavigate } from "react-router-dom";

export default function CommentComponent({ comment }: { comment: Comment }) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  let myUserId: string = useSelector((state: any) => {
    return state.userReducer.user._id;
  });
  let isMyComment: boolean = comment.userId === myUserId;

  const onUserNameClicked = () => {
    if (!isMyComment) {
      dispatch(createChat({ receiverId: comment.userId }));
      // Check if screen is medium or small
      const mediaQuery = window.matchMedia("(max-width: 992px)");
      if (mediaQuery.matches) {
        navigate("/messages");
      }
    }
  };
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
            onClick={onUserNameClicked}
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
                className={
                  isMyComment
                    ? "my-0 font-size-11 text-end"
                    : "my-0 font-size-11 text-start"
                }
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
