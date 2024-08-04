import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navbar.css";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light p-0">
        <div className="container-fluid px-5 pb-md-0 pb-2">
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
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
            <div className="col">
              <div className="float-end">
                <button className="btn btn-outline-primary mx-1">Login</button>
                <button className="btn btn-primary">Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
