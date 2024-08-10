import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CommentComponent({ comment }: { comment: any }) {
  return (
    <div className="card mt-2">
      <div className="card-body pt-2 pb-1">
        <div className="d-flex align-items-center justify-content-between">
          <div
            className="d-flex align-items-center justify-content-start"
            role="button"
          >
            <FontAwesomeIcon
              icon={faCircleUser}
              size="2x"
              style={{ color: "#c2bdbd" }}
            />
            <div className="mx-2">
              <p className="my-0 text-start fw-bold">{comment.userName}</p>
              <p className="my-0 text-start" style={{ fontSize: "11px" }}>
                {comment.createdAt}
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
