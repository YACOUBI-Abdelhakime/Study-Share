import {
  faLinkedin,
  faSquareFacebook,
  faSquareGooglePlus,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SignupDto } from "../../../features/user/types/dtos/SignupDto";
import {
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
} from "../../../utils/formValidations/FormValidations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features/store";
import { register } from "../../../features/user/asyncThunks";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState<SignupDto>({
    name: "",
    dateOfBirth: new Date(),
    email: "",
    password: "",
    confirmation: "",
  });
  const [error, setError] = useState<string | null>(null);
  // Calculate the date 6 years ago
  const currentDate = new Date();
  const sixYearsAgo = new Date(
    currentDate.setFullYear(currentDate.getFullYear() - 6)
  )
    .toISOString()
    .split("T")[0];

  let onUpdateSignupData = (e: any) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  let onSubmitSignup = (e: any, user: SignupDto) => {
    e.preventDefault();
    if (
      validateName(user.name) &&
      validateDate(user.dateOfBirth) &&
      validateEmail(user.email) &&
      validatePassword(user.password) &&
      validatePasswordConfirmation(user.password, user.confirmation)
    ) {
      dispatch(register(user))
        .unwrap()
        .then(() => {
          navigate("/home");
        })
        .catch(() => {
          setError(t("emailAlreadyExists"));
        });
    } else {
      setError(t("signupDataNotValidate"));
    }
  };
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
          {error && (
            <div className="text-center d-flex justify-content-center">
              <p className="text-danger">{error}</p>
            </div>
          )}

          <form>
            <div className="row">
              <div className="col-lg-6 col-12 mb-3">
                <input
                  type="text"
                  placeholder={t("name")}
                  className={
                    validateName(signupData.name) || signupData.name === ""
                      ? "form-control"
                      : "form-control border-2 border-danger"
                  }
                  name="name"
                  value={signupData.name}
                  onChange={onUpdateSignupData}
                  required
                />
              </div>
              <div className="col-lg-6 col-12 mb-3">
                <input
                  type="date"
                  max={sixYearsAgo}
                  placeholder={t("dateOfBirth")}
                  className={
                    validateDate(signupData.dateOfBirth) ||
                    new Date(signupData.dateOfBirth).toDateString() ===
                      new Date().toDateString()
                      ? "form-control"
                      : "form-control border-2 border-danger"
                  }
                  name="dateOfBirth"
                  data-provide="datepicker"
                  value={signupData.dateOfBirth.toString()}
                  onChange={onUpdateSignupData}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-3">
                <input
                  type="email"
                  placeholder={t("email")}
                  className={
                    validateEmail(signupData.email) || signupData.email === ""
                      ? "form-control"
                      : "form-control border-2 border-danger"
                  }
                  aria-describedby="emailHelp"
                  name="email"
                  value={signupData.email}
                  onChange={onUpdateSignupData}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-12 mb-3">
                <input
                  placeholder={t("password")}
                  type="password"
                  className={
                    validatePassword(signupData.password) ||
                    signupData.password === ""
                      ? "form-control"
                      : "form-control border-2 border-danger"
                  }
                  name="password"
                  value={signupData.password}
                  onChange={onUpdateSignupData}
                  required
                />
              </div>
              <div className="col-lg-6 col-12 mb-3">
                <input
                  placeholder={t("confirmation")}
                  type="password"
                  className={
                    validatePasswordConfirmation(
                      signupData.password,
                      signupData.confirmation
                    ) || signupData.confirmation === ""
                      ? "form-control"
                      : "form-control border-2 border-danger"
                  }
                  name="confirmation"
                  value={signupData.confirmation}
                  onChange={onUpdateSignupData}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                onClick={(e) => {
                  onSubmitSignup(e, signupData);
                }}
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
