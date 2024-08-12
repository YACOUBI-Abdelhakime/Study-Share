import {
  faCircleUser,
  faEllipsisVertical,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../../../features/comment/asyncThuks";
import { openCommentsPanel } from "../../../../features/comment/commentSlice";
import { Publication } from "../../../../features/publication/types/Publication";
import { AppDispatch } from "../../../../store";
import { getDateString } from "../../../../utils/dateFormate.ts/dateFormat";
import Comments from "./Comments";
import {
  deletePublication,
  togglePublicationDiscussion,
} from "../../../../features/publication/asyncThuks";

export default function PublicationComponent({
  publication,
}: {
  publication: Publication;
}) {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const openCommentsPanelPublicationId: string = useSelector((state: any) => {
    return state.commentReducer.openCommentsPanelPublicationId;
  });
  const userId: string = useSelector((state: any) => {
    return state.userReducer.user._id;
  });

  const isMyPublication: boolean = userId == publication.userId;

  const showCommentsPanel: boolean =
    openCommentsPanelPublicationId == publication._id;

  const onClickOpenCommentsPanel = (publicationId: string) => {
    // Dispatch the action to fetch comments of this publication
    dispatch(getComments(publicationId));
    // Dispatch the action to open the comments panel of this publication
    dispatch(openCommentsPanel(publicationId));
  };

  const onToggleDiscussion = (publicationId: string) => {
    dispatch(togglePublicationDiscussion(publicationId));
  };

  const onDeletePublication = (publicationId: string) => {
    dispatch(deletePublication(publicationId));
  };

  return (
    <div className="py-2 px-3 px-sm-5">
      <div className="card">
        <div className="card-header " style={{ background: "white" }}>
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
                <p className="my-0 text-start fw-bold">
                  {publication.userName}
                </p>
                <p className="my-0 text-start" style={{ fontSize: "11px" }}>
                  {getDateString(publication.createdAt)}
                </p>
              </div>
            </div>

            {isMyPublication && (
              <>
                <span data-bs-toggle="dropdown">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    size="lg"
                    className="mx-2 px-2 cursor-pointer"
                  />
                </span>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li onClick={() => onToggleDiscussion(publication._id)}>
                    <p className="dropdown-item my-0 py-1 cursor-pointer">
                      {publication.isDiscussionOpen
                        ? t("closeDiscussion")
                        : t("openDiscussion")}
                    </p>
                  </li>
                  <li onClick={() => onDeletePublication(publication._id)}>
                    <p className="dropdown-item my-0 py-1 cursor-pointer">
                      {t("delete")}
                    </p>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{publication.title}</h5>
          <p className="card-text">{publication.content}</p>
          <p className="card-text">Tags : {publication.tags.join(", ")}</p>
        </div>
        <div className="card-footer text-muted">
          <div className="d-flex align-items-center justify-content-between">
            <div
              role="button"
              onClick={() => {
                // open comment panel and fetch comments
                onClickOpenCommentsPanel(publication._id);
              }}
            >
              <FontAwesomeIcon
                icon={faMessage}
                className="mx-2"
                style={{ color: "#c2bdbd" }}
              />
              <span className="my-0 text-start">
                {publication.commentsCount}
              </span>
            </div>
            {publication.isDiscussionOpen ? (
              <div>
                <span
                  role="button"
                  onClick={() => {
                    // open comment panel and fetch comments
                    onClickOpenCommentsPanel(publication._id);
                  }}
                >
                  {t("commentate")}
                </span>
              </div>
            ) : (
              <div>
                <span>{t("discussionClosed")}</span>
              </div>
            )}
          </div>
        </div>
        {/* Show comments if publication id is the same as openCommentsPanelPublicationId in the state */}
        {showCommentsPanel && <Comments publication={publication} />}
      </div>
    </div>
  );
}
