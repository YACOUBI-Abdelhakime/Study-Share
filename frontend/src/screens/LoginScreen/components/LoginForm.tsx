import {
  faLinkedin,
  faSquareFacebook,
  faSquareGooglePlus,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../features/store";
import { login } from "../../../features/user/asyncThunks";
import { LoginDto } from "../../../features/user/types/dtos/LoginDto";

export default function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const [loginData, setLoginData] = useState<LoginDto>({
    email: "",
    password: "",
  });

  let onUpdateLoginData = (e: any) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  let onSubmitLogin = (e: any, user: LoginDto) => {
    e.preventDefault();

    dispatch(login(user))
      .unwrap()
      .then(() => {
        navigate("/home");
      });
  };
  return (
    <div className="col-12 col-md-7 bg-primary p-0">
      <div className="h-100 d-flex align-items-center justify-content-center bg-light">
        <div className="p-sm-3 p-md-5 p-2">
          <div className="text-center">
            <h2 className="fw-bold fs-1">{t("loginTitle")}</h2>
            <p>{t("socialLogin")}</p>
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
            <div className="mb-3">
              <input
                type="email"
                placeholder={t("email")}
                className="form-control"
                aria-describedby="emailHelp"
                name="email"
                value={loginData.email}
                onChange={onUpdateLoginData}
                required
              />
            </div>
            <div className="mb-3">
              <input
                placeholder={t("password")}
                type="password"
                className="form-control"
                name="password"
                value={loginData.password}
                onChange={onUpdateLoginData}
                required
              />
            </div>
            <div className="d-flex justify-content-start">
              <p>{t("forgotPassword")}</p>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary gradient-primary w-100 text-white"
                onClick={(e) =>
                  onSubmitLogin(e, {
                    email: loginData.email,
                    password: loginData.password,
                  })
                }
              >
                {t("login")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
