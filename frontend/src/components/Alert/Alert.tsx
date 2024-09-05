import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { emptyAlertMessage } from "../../features/global/globalSlice";
import { AlertType } from "../../features/global/types/AlertType";
import { AppDispatch } from "../../features/store";

export default function Alert() {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const { message, type }: { message: string; type: AlertType } = useSelector(
    (state: any) => state.globalReducer
  );
  const closeAlert = () => {
    dispatch(emptyAlertMessage());
  };

  return (
    <>
      {message && (
        <div className="position-relative">
          <div
            className={
              type == AlertType.ERROR
                ? "alert  alert-danger alert-dismissible fade show rounded-0 position-absolute top-0 start-0 w-100"
                : "alert  alert-success alert-dismissible fade show rounded-0 position-absolute top-0 start-0 w-100"
            }
            role="alert"
            style={{ zIndex: 10 }}
          >
            <div className="container">
              <span>
                <strong>{t(type + " :")} </strong> {t(message)}
              </span>
              <button
                className="btn btn-close me-3"
                data-dismiss="alert"
                aria-label="Close"
                aria-hidden="true"
                onClick={closeAlert}
              ></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
