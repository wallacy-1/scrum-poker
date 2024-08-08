import { useForm } from "react-hook-form";
import { FormInput, Button } from "../../components/atoms";
import socket from "../../services/scrum-poker/webSocketService";
import { useEffect } from "react";

function Home() {
  const roomForm = useForm();

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

  const handleCreateRoom = (data: {}) => {
    console.log(`handleCreateRoom - data: ${JSON.stringify(data)}`);

    socket.emit("createRoom");
  };

  const handleJoinRoom = (data: { roomId?: string }) => {
    console.log(`handleJoinRoom - data: ${JSON.stringify(data)}`);
    if (!data.roomId) return;

    //joinRoom(data.roomId);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full h-screen justify-evenly">
        <div>
          <p>New room:</p>
          <form onSubmit={roomForm.handleSubmit(handleCreateRoom)}>
            <Button type="submit">Create room</Button>
          </form>
        </div>
        <div>
          <p>Join room:</p>
          <form onSubmit={roomForm.handleSubmit(handleJoinRoom)}>
            <FormInput
              id="roomId"
              type="text"
              label="Room id:"
              register={roomForm.register("roomId")}
              error={roomForm.formState.errors.roomId}
            />

            <Button type="submit">Enter room</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
