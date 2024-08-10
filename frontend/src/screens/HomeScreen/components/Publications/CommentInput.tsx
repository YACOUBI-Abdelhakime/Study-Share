import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  addComment,
  getComments,
} from "../../../../features/comment/asyncThuks";
import { AddCommentDto } from "../../../../features/comment/types/dtos/addCommentDto";
import { Publication } from "../../../../features/publication/types/Publication";
import { AppDispatch } from "../../../../store";
import { getPublications } from "../../../../features/publication/asyncThuks";

export default function CommentInput({
  publication,
  commentsScrollbarRef,
}: {
  publication: Publication;
  commentsScrollbarRef: React.RefObject<HTMLDivElement>;
}) {
  const { t } = useTranslation();
  const commentRef = useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();

  const onAddCommentClicked = (e: any) => {
    e.preventDefault();
    let comment: string = e.target["comment"].value;
    if (comment.trim() === "") {
      if (commentRef.current) {
        commentRef.current.value = "";
        commentRef.current.focus();
      }
      return;
    }
    let commentArg: AddCommentDto = {
      publicationId: publication._id,
      content: comment,
    };
    dispatch(addComment(commentArg)).then(() => {
      dispatch(getComments(publication._id)).then(() => {
        if (commentsScrollbarRef.current) {
          commentsScrollbarRef.current.scrollTop =
            commentsScrollbarRef.current.scrollHeight;
        }
      });
      dispatch(getPublications());
    });
    if (commentRef.current) {
      commentRef.current.value = "";
    }
  };
  return (
    <div className="rounded-bottom p-2" style={{ backgroundColor: "white" }}>
      <form onSubmit={onAddCommentClicked}>
        <div className="input-group">
          <input
            ref={commentRef}
            type="text"
            name="comment"
            className="form-control"
            placeholder={t("comment")}
          />
          <button className="btn btn-primary">{t("commentate")}</button>
        </div>
      </form>
    </div>
  );
}
