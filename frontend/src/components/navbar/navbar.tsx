import {
  faBars,
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.userReducer.user);

  const onLogoutClicked = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <nav
      className="navbar navbar-expand-md navbar-light gradient-light-vertical p-0 fixed-top"
      style={{ height: "55px" }}
    >
      <div className="container-fluid px-5 pb-0">
        <div>
          <Link to="/">
            <img
              src="assets/logo-1x2.svg"
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
              <Link className="nav-link" to="/messages">
                {t("messages")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notifications">
                {t("notifications")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-publication">
                {t("addPublication")}
              </Link>
            </li>
          </ul>
          <div className="col">
            {user ? (
              <div className="float-end pb-md-0 pb-2">
                <button
                  className="btn btn-outline-primary mx-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={t("logout")}
                  onClick={onLogoutClicked}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} rotation={180} />
                </button>
                <Link className="btn btn-primary" to="/profile">
                  <FontAwesomeIcon icon={faCircleUser} size="xl" />
                </Link>
              </div>
            ) : (
              <div className="float-end pb-md-0 pb-2">
                <Link className="btn btn-outline-primary mx-2" to="/login">
                  {t("login")}
                </Link>
                <Link className="btn btn-primary" to="/register">
                  {t("signup")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
