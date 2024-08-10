import { Publication } from "../../../../features/publication/types/Publication";
import CommentComponent from "./Comment";
import CommentInput from "./CommentInput";

export default function Comments({
  publication,
}: {
  publication: Publication;
}) {
  const comments = [
    {
      _id: "1",
      postId: "qsds2qdqd4454",
      userId: "qsds7qdqd4454",
      userName: "Hakim ycb",
      createdAt: "2021-09-01",
      content:
        "Si quelqu'un peut m'expliquer les étapes et les méthodes pour résoudre ces problèmes, ce serait super.",
    },
    {
      _id: "2",
      postId: "qsdcvwsqdqd4454",
      userId: "qsdsqdqdqsd4454",
      userName: "Reda mst",
      createdAt: "2021-09-01",
      content:
        "Je suis en train d'étudier la Révolution Française et j'ai besoin d'explications sur les causes profondes ",
    },
    {
      _id: "3",
      postId: "qsdsqdqd445ss4",
      userId: "qsdsqdqd445z4",
      userName: "Salman ssk",
      createdAt: "2021-12-01",
      content: "Toute aide pour une vue d'ensemble complète serait appréciée.",
    },
    {
      _id: "4",
      postId: "qsds2qdqd4454",
      userId: "qsds7qdqd4454",
      userName: "Youns klf",
      createdAt: "2021-09-01",
      content:
        "Si quelqu'un peut m'expliquer les étapes et les méthodes pour résoudre ces problèmes, ce serait super.",
    },
    {
      _id: "5",
      postId: "qsds2qdqd4454",
      userId: "qsds7qdqd4454",
      userName: "Karim chd",
      createdAt: "2021-09-01",
      content:
        "Si quelqu'un peut m'expliquer les étapes et les méthodes pour résoudre ces problèmes, ce serait super.",
    },
    {
      _id: "6",
      postId: "qsds2qdqd4454",
      userId: "qsds7qdqd4454",
      userName: "Matin ghp",
      createdAt: "2021-09-01",
      content:
        "Si quelqu'un peut m'expliquer les étapes et les méthodes pour résoudre ces problèmes, ce serait super.",
    },
  ];

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
      <CommentInput publication={publication} />
    </div>
  );
}
