import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("");

  return (
    <>
      <h1 className="text-4xl font-bold font-heading text-center">{t("pages.home.title")} <strong className="text-primary">{t("globals.appName")}!</strong></h1>
      <p className="mt-4 text-lg text-center">{t("pages.home.description")}</p>
    </>
  );
}
