import { useTranslation } from "react-i18next";
import { Button } from "../../components/atoms";
import socket from "../../services/scrum-poker/webSocketService";
import { useEffect } from "react";
import { Navbar } from "../../components/organisms";
import { useNavigate } from "react-router-dom";

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();

    socket.on("newRoom", (newRoomId) => {
      navigate(`/room/${newRoomId}`);
    });

    socket.on("error", (message) => {
      alert(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  const handleCreateRoom = () => {
    console.log(`handleCreateRoom`);

    socket.emit("createRoom");
  };

  return (
    <>
      <main className="flex flex-col items-center w-full h-screen">
        <Navbar />
        <section className="flex items-center justify-center w-full h-full bg-gray-700">
          <Button onClick={handleCreateRoom}>
            {t("screens.home.new_room")}
          </Button>
        </section>
      </main>
    </>
  );
}

export default Home;
