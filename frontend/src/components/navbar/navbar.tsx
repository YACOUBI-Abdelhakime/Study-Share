import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";

export default function Navbar() {
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
                  Accueil
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Messages
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Profil
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Notifications
                </a>
              </li>
            </ul>
            <div className="col">
              <div className="float-end pb-md-0 pb-2">
                <button className="btn btn-outline-primary mx-2">
                  Se connecter
                </button>
                <button className="btn btn-primary ">S'inscrire</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
