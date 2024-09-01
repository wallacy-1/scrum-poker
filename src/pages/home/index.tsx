import { Button } from "../../components/atoms";
import socket from "../../services/scrum-poker/webSocketService";
import { useEffect } from "react";

function Home() {
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
    <div className="flex flex-col items-center bg-slate-50">
      <div className="flex w-full h-screen justify-evenly">
        <div>
          <p>New room:</p>
          <Button onClick={handleCreateRoom}>Create room</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
