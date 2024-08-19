import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PublicationComponent from "./Publication";
import { AppDispatch } from "../../store";
import { Publication } from "../../features/publication/types/Publication";
import { getPublications } from "../../features/publication/asyncThuks";
import { openCommentsPanel } from "../../features/comment/commentSlice";

export default function Publications() {
  const dispatch: AppDispatch = useDispatch();
  let publications: Publication[] = [];
  publications = useSelector((state: any) => {
    return state.publicationReducer.publications;
  });

  useEffect(() => {
    dispatch(getPublications());
    // Use empty string to close the comments panel
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
