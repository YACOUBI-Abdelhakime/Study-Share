import { useTranslation } from "react-i18next";
import PublicationComponent from "./Publication";
import { Publication } from "../../../../features/publication/types/Publication";

export default function Publications() {
  const { t } = useTranslation();
  const Publications: Publication[] = [
    {
      title: "Publication 1",
      content: "Description 1",
      commentCount: 132,
      publicationDate: "2021-09-01",
      isDiscussionOpen: true,
      tags: ["Math", "SVT"],
      userId: "5445454545sqqdq",
      userName: "Khalil_ys",
    },
    {
      title: "Publication 2",
      content: "Description 2",
      commentCount: 132,
      publicationDate: "2021-09-01",
      isDiscussionOpen: false,
      tags: ["Math", "SVT"],
      userId: "5445454545sqqdq",
      userName: "Laith_km",
    },
    {
      title: "Publication 3",
      content: "Description 3",
      commentCount: 132,
      publicationDate: "2021-09-01",
      isDiscussionOpen: false,
      tags: ["Math", "SVT"],
      userId: "5445454545sqqdq",
      userName: "Alipp_Doe",
    },
    {
      title: "Publication 4",
      content: "Description 4",
      commentCount: 132,
      publicationDate: "2021-09-01",
      isDiscussionOpen: true,
      tags: ["Math", "SVT"],
      userId: "5445454545sqqdq",
      userName: "John_Doe",
    },
    {
      title: "Publication 5",
      content: "Description 5",
      commentCount: 132,
      publicationDate: "2021-09-01",
      isDiscussionOpen: true,
      tags: ["Math", "SVT"],
      userId: "5445454545sqqdq",
      userName: "Abdel_Doe",
    },
    {
      title: "Publication 6",
      content: "Description 6",
      commentCount: 132,
      publicationDate: "2021-09-01",
      isDiscussionOpen: true,
      tags: ["Math", "SVT"],
      userId: "5445454545sqqdq",
      userName: "John_Doe",
    },
  ];

  return (
    <div className="h-100 bg-light">
      <div className="h-100 overflow-auto hide-scrollbar">
        {Publications.map((Publication) => (
          <PublicationComponent publication={Publication} />
        ))}
      </div>
    </div>
  );
}
