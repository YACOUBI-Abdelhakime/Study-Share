import {
  faBars,
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useRef } from "react";

export default function Navbar() {
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.userReducer.user);
  const navbarRef = useRef<HTMLDivElement>(null);

  const onLogoutClicked = () => {
    localStorage.clear();
    window.location.reload();
  };

  const closeNavbar = () => {
    navbarRef.current?.classList.remove("show");
  };
  return (
    <nav
      className="navbar navbar-expand-md navbar-light  bg-light p-0 fixed-top"
      style={{ height: "55px" }}
    >
      <div className="container-fluid px-5 pb-0">
        <div>
          {user ? (
            <Link to="/">
              <img
                src="assets/logo-1x2.svg"
                alt="Study Share Logo"
                className="navbar-logo"
              />
            </Link>
          ) : (
            <img
              src="assets/logo-1x2.svg"
              alt="Study Share Logo"
              className="navbar-logo"
            />
          )}
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
        <div
          className="collapse navbar-collapse bg-light"
          id="navbarContent"
          ref={navbarRef}
        >
          {user && (
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/" onClick={closeNavbar}>
                  {t("home")}
                </Link>
              </li>
              <li className="nav-item d-block d-lg-none">
                <Link className="nav-link" to="/messages" onClick={closeNavbar}>
                  {t("messages")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/add-publication"
                  onClick={closeNavbar}
                >
                  {t("addPublication")}
                </Link>
              </li>
            </ul>
          )}
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
                <Link className="btn btn-primary" to="/" onClick={closeNavbar}>
                  <FontAwesomeIcon icon={faCircleUser} size="xl" />
                </Link>
              </div>
            ) : (
              <div className="float-end pb-md-0 pb-2">
                <Link
                  className="btn btn-outline-primary mx-2"
                  to="/login"
                  onClick={closeNavbar}
                >
                  {t("login")}
                </Link>
                <Link
                  className="btn btn-primary"
                  to="/register"
                  onClick={closeNavbar}
                >
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
