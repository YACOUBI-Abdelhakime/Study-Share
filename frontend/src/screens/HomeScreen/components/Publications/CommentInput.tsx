import { Publication } from "../../../../features/publication/types/Publication";

export default function CommentInput({
  publication,
}: {
  publication: Publication;
}) {
  return (
    <div className="rounded-bottom p-2" style={{ backgroundColor: "white" }}>
      <form>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Commentaire"
          />
          <button className="btn btn-primary">Commenter</button>
        </div>
      </form>
    </div>
  );
}
