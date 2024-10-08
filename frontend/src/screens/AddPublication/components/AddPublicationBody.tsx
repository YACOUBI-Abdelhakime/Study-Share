import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addPublication } from "../../../features/publication/asyncThuks";
import { AddPublicationDto } from "../../../features/publication/types/dtos/AddPublicationDto";
import { AppDispatch } from "../../../features/store";

export default function AddPublicationBody() {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [tagValues, setTagValues] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // Get the tag values from Redux store
  const tagValuesFromStore = useSelector(
    (state: any) => state.publicationReducer.publicationTagValues
  );

  useEffect(() => {
    console.log("use effect re-render");
    let list: string[] = [...tagValuesFromStore].sort((a, b) =>
      a.localeCompare(b)
    );
    list = list.map((tag) => tag.toLowerCase());
    setTagValues(list);
  }, [tagValuesFromStore]);

  const selectTag = (tag: string) => {
    if (selectedTags.length >= 3) {
      return;
    }
    setSelectedTags([...selectedTags, tag]);
    setTagValues(tagValues.filter((value) => value !== tag));
  };

  const deleteSelectedTag = (tag: string) => {
    let list: string[] = [...tagValues, tag];
    list.sort((a, b) => a.localeCompare(b));
    setTagValues(list);
    setSelectedTags(selectedTags.filter((value) => value !== tag));
  };

  const hideAlert = () => {
    setShowSuccessAlert(false);
  };

  const onSubmitAddPublication = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const title: string = (data.get("title") as string) ?? "";
    const content: string = (data.get("content") as string) ?? "";
    const tags = selectedTags.map((tag) => tag.toUpperCase());
    const newPublication: AddPublicationDto = { title, content, tags };
    dispatch(addPublication(newPublication)).then(() => {
      form.reset();
      setSelectedTags([]);
      setShowSuccessAlert(true);
    });
  };

  return (
    <div className="h-100 bg-light">
      <div className="h-100 overflow-auto hide-scrollbar py-2 px-3 px-sm-5  position-relative">
        {showSuccessAlert && (
          <div
            className="alert alert-success alert-dismissible fade show rounded-0 position-absolute top-0 start-0 w-100"
            role="alert"
            style={{ zIndex: 10 }}
          >
            <strong>{t("publicationAdded")}</strong> {t("publicationPosted")}
            <button
              className="btn btn-close me-3"
              data-dismiss="alert"
              aria-label="Close"
              aria-hidden="true"
              onClick={hideAlert}
            ></button>
          </div>
        )}
        <div className="row">
          <div className="card mt-3 col-12">
            <div className="card-body">
              <h5 className="card-title text-center">{t("newPublication")}</h5>
              <form onSubmit={onSubmitAddPublication}>
                <div className="mb-3">
                  <label htmlFor="publicationTitle" className="form-label">
                    {t("title")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="publicationTitle"
                    name="title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="publicationContent" className="form-label">
                    {t("content")}
                  </label>
                  <textarea
                    className="form-control"
                    id="publicationContent"
                    name="content"
                    rows={5}
                    required
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="tags" className="form-label">
                    {t("tags")} : {selectedTags.length}/3
                  </label>
                  <div className="row ">
                    <div className="col-3 dropdown">
                      <button
                        className="btn btn-light dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="mx-1">{t("tags")}</span>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        {tagValues.map((tag) => (
                          <li key={tag} onClick={() => selectTag(tag)}>
                            <p className="dropdown-item my-0 py-1 cursor-pointer">
                              {t(tag)}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-9 d-flex">
                      <div className="h-100 border px-1 rounded flex-grow-1 d-flex align-items-center overflow-auto">
                        {selectedTags.map((tag) => (
                          <div
                            key={tag}
                            className="badge bg-light mx-1 py-2 text-dark"
                          >
                            <span className="mx-2 ">{t(tag)}</span>
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              size="lg"
                              style={{ color: "#bb5539" }}
                              className="me-2"
                              onClick={() => deleteSelectedTag(tag)}
                              role="button"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {t("Submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
