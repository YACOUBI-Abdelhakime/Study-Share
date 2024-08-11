import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
enum PublicationTagEnum {
  MATHEMATICS = "Mathématiques",
  HISTORY = "Histoire",
  GEOGRAPHY = "Géographie",
  LIFE_AND_EARTH_SCIENCES = "SVT",
  PHYSICS = "Physique",
  CHEMISTRY = "Chimie",
  SPORT = "Sport",
  TECHNOLOGY = "Technologie",
  ARTS = "Arts",
  MUSIC = "Musique",
  PHILOSOPHY = "Philosophie",
  ECONOMICS = "Économie",
  COMPUTER_SCIENCE = "Informatique",
  ARABIC = "Arabe",
  ENGLISH = "Anglais",
  FRENCH = "Français",
  SPANISH = "Espagnol",
  GERMAN = "Allemand",
  ITALIAN = "Italien",
}

export default function AddPublicationBody() {
  const { t } = useTranslation();
  // let tagValues: string[] = [];
  // let selectedTagsList: string[] = [];

  const [tagValues, setTagValues] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    let list: string[] = Object.values(PublicationTagEnum);
    list.sort((a, b) => a.localeCompare(b));
    setTagValues(list);
  }, []);

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

  const onSubmitAddPublication = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const title = data.get("title");
    const content = data.get("content");
    const tags = selectedTags;

    console.log(title, content, tags);
  };

  return (
    <div className="h-100 bg-light">
      <div className="h-100 overflow-auto hide-scrollbar py-2 px-3 px-sm-5">
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
                            <p
                              className="dropdown-item my-0 py-1"
                              style={{ cursor: "pointer" }}
                            >
                              {tag}
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
                            <span className="mx-2 ">{tag}</span>
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              size="lg"
                              style={{ color: "#bb5539" }}
                              className="me-2"
                              onClick={() => deleteSelectedTag(tag)}
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
