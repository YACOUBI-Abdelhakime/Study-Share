import { useTranslation } from "react-i18next";
import Chats from "../Chat/Chats";
import "./RightPanel.css";

export default function RightPanel() {
  const { t } = useTranslation();
  return (
    <div className="h-100 border-start">
      <div className="h-100 bg-light  ">
        <div className="w-100 bg-light border-bottom panel-header-height-100">
          <span className="h4 mx-2">{t("messages")}</span>
        </div>
        <div className="overflow-auto hide-scrollbar panel-body-height-100">
          <Chats />
        </div>
      </div>
    </div>
  );
}
