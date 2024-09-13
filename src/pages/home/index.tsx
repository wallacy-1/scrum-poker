import { useTranslation } from "react-i18next";
import { Button } from "../../components/atoms";
import socket from "../../services/scrum-poker/webSocketService";
import { useEffect } from "react";
import { Navbar } from "../../components/organisms";

function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    socket.connect();

    socket.on("newRoom", (newRoomId) => {
      window.location.href = `/room/${newRoomId}`;
    });

    socket.on("error", (message) => {
      alert(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCreateRoom = () => {
    console.log(`handleCreateRoom`);

    socket.emit("createRoom");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-700">
        <div className="flex w-full h-screen justify-evenly">
          <div>
            <h1>{t("screens.home.new")}:</h1>
            <Button onClick={handleCreateRoom}>{t("common.create")}</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
