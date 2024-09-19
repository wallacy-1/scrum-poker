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
      <Navbar />
      <main className="flex flex-col items-center">
        <section className="flex items-center justify-between w-full min-h-[calc(100vh-80px)] px-10 bg-gray-700">
          <div className="flex justify-center w-1/2 border-2 border-gray-900">
            <img
              src="/images/room_view.png"
              alt="Room_image_view"
              className="h-auto max-w-full"
            />
          </div>

          <div className="flex flex-col items-center justify-center w-1/2 text-white">
            <h1 className="mb-6 text-4xl">{t("screens.home.room")}</h1>
            <Button onClick={handleCreateRoom}>{t("common.create")}</Button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
