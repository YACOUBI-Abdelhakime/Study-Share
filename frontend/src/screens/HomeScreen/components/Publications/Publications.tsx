import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCommentsPanel } from "../../../../features/comment/commentSlice";
import { getPublications } from "../../../../features/publication/asyncThuks";
import { Publication } from "../../../../features/publication/types/Publication";
import { AppDispatch } from "../../../../store";
import PublicationComponent from "./Publication";

export default function Publications() {
  const dispatch: AppDispatch = useDispatch();
  let publications: Publication[] = [];
  publications = useSelector((state: any) => {
    return state.publicationReducer.publications;
  });

  useEffect(() => {
    dispatch(getPublications());
    dispatch(openCommentsPanel(""));
  }, []);

  return (
    <div className="h-100 bg-light">
      <div className="h-100 overflow-auto hide-scrollbar">
        {publications.map((publication) => (
          <PublicationComponent
            publication={publication}
            key={publication._id}
          />
        ))}
      </div>
    </div>
  );
}
