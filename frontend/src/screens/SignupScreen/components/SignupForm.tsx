import {
  faLinkedin,
  faSquareFacebook,
  faSquareGooglePlus,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

export default function SignupForm() {
  const { t } = useTranslation();
  return (
    <div className="col-12 col-md-7 bg-primary p-0">
      <div className="h-100 d-flex align-items-center justify-content-center bg-light">
        <div className="p-sm-3 p-md-5 p-2">
          <div className="text-center mb-5">
            <h2 className="fw-bold fs-1">{t("signupTitle")}</h2>
            <p>{t("signupDescription")}</p>
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
            <p className="text-center mx-3">{t("or")}</p>
            <hr className="w-100" />
          </div>

          <form>
            <div className="row">
              <div className="col-lg-6 col-12 mb-3">
                <input
                  type="name"
                  placeholder={t("name")}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div className="col-lg-6 col-12 mb-3">
                <input
                  type="email"
                  placeholder={t("email")}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-12 mb-3">
                <input
                  placeholder={t("password")}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
              <div className="col-lg-6 col-12 mb-3">
                <input
                  placeholder={t("confirmation")}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary gradient-primary w-100 text-white"
              >
                {t("signup")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
