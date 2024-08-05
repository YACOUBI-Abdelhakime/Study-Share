import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { t } = useTranslation();
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light gradient-light-vertical p-0 fixed-top">
        <div className="container-fluid px-5 pb-0">
          <div>
            <Link to="/">
              <img
                src="./src/assets/logo-1x2.svg"
                alt="Study Share Logo"
                className="navbar-logo"
              />
            </Link>
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
                <Link className="nav-link active" to="/">
                  {t("home")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/messages">
                  {t("messages")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/profile">
                  {t("profile")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/notifications">
                  {t("notifications")}
                </Link>
              </li>
            </ul>
            <div className="col">
              <div className="float-end pb-md-0 pb-2">
                <Link className="btn btn-outline-primary mx-2" to="/login">
                  {t("login")}
                </Link>
                <Link className="btn btn-primary" to="/register">
                  {t("signup")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
