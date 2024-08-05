import { useTranslation } from "react-i18next";

export default function SignupInfo() {
  const { t } = useTranslation();
  return (
    <div className="col-12 col-md-5 gradient-primary">
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="p-sm-3 p-md-5 p-2">
          <div className="text-center  text-white">
            <h2 className="fw-bold fs-1 mb-4">{t("signupPrompt")}</h2>
            <p className=" mb-3">{t("signupDescription")}</p>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <button
              type="submit"
              className="btn btn-primary gradient-light-horizontal w-100"
            >
              {t("signup")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
