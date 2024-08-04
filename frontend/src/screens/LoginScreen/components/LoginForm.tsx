import {
  faLinkedin,
  faSquareFacebook,
  faSquareGooglePlus,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoginForm() {
  return (
    <div className="col-12 col-md-7 bg-primary p-0">
      <div className="h-100 d-flex align-items-center justify-content-center bg-light">
        <div className="p-sm-3 p-md-5 p-2">
          <div className="text-center">
            <h2 className="fw-bold fs-1">Connectez-vous à votre compte</h2>
            <p>Se connecter via les réseaux sociaux</p>
          </div>

          <div className="d-flex justify-content-center my-3">
            <a className="mx-2" type="button">
              <FontAwesomeIcon
                icon={faSquareFacebook}
                size="2x"
                style={{ color: "#3b5998" }}
              />
            </a>
            <a className="mx-2" type="button">
              <FontAwesomeIcon
                icon={faSquareGooglePlus}
                size="2x"
                style={{ color: "#db4437" }}
              />
            </a>
            <a className="mx-2" type="button">
              <FontAwesomeIcon
                icon={faLinkedin}
                size="2x"
                style={{ color: "#0077b5" }}
              />
            </a>
          </div>
          <div className="d-flex justify-content-center my-3">
            <hr className="w-100" />
            <p className="text-center mx-3">Ou</p>
            <hr className="w-100" />
          </div>
          <form>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="Mot de passe"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>
            <div className="d-flex justify-content-start">
              <p>Mot de passe oublié !</p>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary gradient-primary w-100 text-white"
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
