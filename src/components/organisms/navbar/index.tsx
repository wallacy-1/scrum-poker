import { Button } from "../../atoms";
import socket from "../../../services/scrum-poker/webSocketService";
import { NavbarPropsInterface } from "./interfaces";

const Navbar: React.FC<NavbarPropsInterface> = ({ roomId }) => {
  const handleRevealCards = () => {
    console.log("handleRevealCards");
    socket.emit("revealCards", roomId);
  };

  const handleRestartVoting = () => {
    console.log("handleRestartVoting");
    socket.emit("reset", roomId);
  };

  return (
    <nav className="flex items-center justify-between p-4 text-white bg-gray-800">
      <div className="flex items-center space-x-4">
        <a href="/" className="text-2xl font-bold">
          MyApp
        </a>
        <a href="/#home" target="_blank" className="text-sm">
          How to Play
        </a>
        <a href="/#about" target="_blank" className="text-sm">
          About
        </a>
      </div>
      <div className="flex space-x-4">
        <Button onClick={handleRevealCards}>Reveal cards</Button>
        <Button onClick={handleRestartVoting}>Restart voting</Button>
      </div>
      <div className="flex space-x-4"></div>
    </nav>
  );
};

export default Navbar;
