export default function SignupInfo() {
  return (
    <div className="col-12 col-md-5 gradient-primary">
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="p-sm-3 p-md-5 p-2">
          <div className="text-center  text-white">
            <h2 className="fw-bold fs-1 mb-4">Nouveau ici ?</h2>
            <p className=" mb-3">
              Inscrivez-vous pour rejoindre notre communauté et obtenir de
              l'aide sur vos études !
            </p>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <button
              type="submit"
              className="btn btn-primary gradient-light-horizontal w-100"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
