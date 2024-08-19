import { useSelector } from "react-redux";
import { Publication } from "../../features/publication/types/Publication";
import PublicationComponent from "../Publication/Publication";

export default function RightPanel() {
  let publications: Publication[] = [];
  publications = useSelector((state: any) => {
    return state.publicationReducer.publications;
  });
  return (
    <div className="h-100 bg-light border-start">
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
