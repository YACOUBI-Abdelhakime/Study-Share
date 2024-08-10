import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Publication } from "../../../../features/publication/types/Publication";
import { faCircleUser, faMessage } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Comments from "./Comments";

export default function PublicationComponent({
  publication,
}: {
  publication: Publication;
}) {
  const { t } = useTranslation();
  let createdAt: Date = new Date(publication.createdAt);
  let publicationDate: string =
    createdAt.getFullYear() +
    "/" +
    (createdAt.getMonth() + 1) +
    "/" +
    createdAt.getDate();

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
                  {publicationDate}
                </p>
              </div>
            </div>
            {!publication.isDiscussionOpen && (
              <div className="">
                <span className="my-0">{t("discussionClosed")}</span>
              </div>
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
            {publication.isDiscussionOpen && (
              <div>
                <span
                  className="my-0"
                  role="button"
                  onClick={() => {
                    // open comment panel and fetch comments
                  }}
                >
                  {t("commentate")}
                </span>
              </div>
            )}
          </div>
        </div>
        <Comments publication={publication} />
      </div>
    </div>
  );
}
