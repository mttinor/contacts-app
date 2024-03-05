import { useTranslation } from "react-i18next";

export default function NoPage() {
  const { t } = useTranslation();
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>{t("pageNotFind")}</h1>
    </div>
  );
}
