import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function LoginInfo() {
  const { t } = useTranslation();
  return (
    <div className="col-12 col-md-5 gradient-primary">
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="p-sm-3 p-md-5 p-2">
          <div className="text-center  text-white">
            <h2 className="fw-bold fs-1 mb-4">{t("loginTitleInfo")}</h2>
            <p className=" mb-3">{t("loginDescriptionInfo")}</p>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <Link
              className="btn btn-primary gradient-light-horizontal w-100"
              to="/login"
            >
              {t("login")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
