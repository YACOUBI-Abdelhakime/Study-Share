import RightPanel from "../HomeScreen/components/RightPanel";
import AddPublicationBody from "./components/AddPublicationBody";

export default function AddPublication() {
  return (
    <div className="container-fluid p-0 m-0 bg-danger">
      <div className="row m-0">
        <div className="col-lg-7 body-height-100 m-0 p-0">
          <AddPublicationBody />
        </div>
        <div className="col-lg-5 d-none d-lg-block body-height-100 p-0 m-0">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
