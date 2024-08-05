import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

export default function Navbar() {
  const { t } = useTranslation();
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light gradient-light-vertical p-0 fixed-top">
        <div className="container-fluid px-5 pb-0">
          <div>
            <a href="#">
              <img
                src="./src/assets/logo-1x2.svg"
                alt="Study Share Logo"
                className="navbar-logo"
              />
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  {t("home")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  {t("messages")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  {t("profile")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  {t("notifications")}
                </a>
              </li>
            </ul>
            <div className="col">
              <div className="float-end pb-md-0 pb-2">
                <button className="btn btn-outline-primary mx-2">
                  {t("login")}
                </button>
                <button className="btn btn-primary">{t("signup")}</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
