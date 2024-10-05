import { Link } from "react-router-dom";
import { Navbar } from "../../components/organisms";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation("", {
    keyPrefix: "screens.not_found",
  });

  return (
    <main className="flex flex-col items-center w-full h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full h-full bg-gray-700">
        <h1 className="font-bold text-white text-9xl">404</h1>
        <h2 className="mb-4 text-3xl font-semibold text-white">{t("title")}</h2>
        <p className="mb-8 text-lg text-white">{t("description")}</p>
        <Link
          to="/"
          className="px-6 py-3 text-white transition duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          {t("link_home")}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
