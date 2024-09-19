import { Button } from "../../atoms";
import socket from "../../../services/scrum-poker/webSocketService";
import { NavbarPropsInterface } from "./interfaces";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../../molecules";
import { Link } from "react-router-dom";

const Navbar: React.FC<NavbarPropsInterface> = ({ roomId }) => {
  const { t } = useTranslation("", {
    keyPrefix: "organisms.navbar",
  });

  const handleRevealCards = () => {
    console.log("handleRevealCards");
    socket.emit("revealCards", roomId);
  };

  const handleRestartVoting = () => {
    console.log("handleRestartVoting");
    socket.emit("reset", roomId);
  };

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between p-4 text-white bg-gray-800">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-2xl font-bold">
          {t("home")}
        </Link>
      </div>

      {roomId && (
        <div className="flex space-x-4">
          <Button onClick={handleRevealCards}>{t("reveal_cards")}</Button>
          <Button onClick={handleRestartVoting}>{t("restart_voting")}</Button>
        </div>
      )}
      <div className="flex space-x-4">
        <LanguageSelector />
      </div>
    </nav>
  );
};

export default Navbar;
