import { useSelector } from "react-redux";
import { Publication } from "../../../../features/publication/types/Publication";
import CommentComponent from "./Comment";
import CommentInput from "./CommentInput";
import { Comment } from "../../../../features/comment/types/Comment";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Comments({
  publication,
}: {
  publication: Publication;
}) {
  let comments: Comment[] = [];
  let isLoading: boolean = true;
  comments = useSelector((state: any) => {
    return state.commentReducer.comments[publication._id];
  });
  isLoading = useSelector((state: any) => {
    return state.commentReducer.isLoading;
  });
  return (
    <div>
      <div
        className="card-body overflow-auto hide-scrollbar"
        style={{ maxHeight: "300px" }}
      >
        {comments.map((comment) => (
          <CommentComponent comment={comment} key={comment._id} />
        ))}
      </div>
      <div className="text-center mt-2">
        {isLoading && (
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="2x"
            style={{ color: "#5cdb95" }}
          />
        )}
      </div>
      <CommentInput publication={publication} />
    </div>
  );
}
