import { useForm } from "react-hook-form";
import { Button, FormInput } from "../../components/atoms";
import { Deck, Board } from "../../components/molecules";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../services/scrum-poker/webSocketService";
import { getMainPlayer } from "../../utils";
import { Modal } from "../../components/organisms";
import {
  PlayerDataInterface,
  PlayerRolesEnum,
  RoomDataInterface,
} from "./interfaces";

function Room() {
  const [roomData, setRoomData] = useState<RoomDataInterface>();

  const mainPlayer: PlayerDataInterface | null = useMemo(() => {
    return getMainPlayer(roomData?.players);
  }, [roomData?.players]);

  const [joinModal, setJoinModal] = useState(true);
  const { roomId } = useParams();
  const playerInfoForm = useForm();

  useEffect(() => {
    console.log("useEffect", socket.id);
    socket.connect();

    socket.on("roomUpdate", (newRoomData) => {
      console.log("socket received - newRoomData: ", newRoomData);
      setRoomData(newRoomData);
    });

    socket.on("playerKicked", (playerId: string) => {
      if (playerId === socket.id) {
        alert("The admin kick you from room.");
        window.location.href = "/";
      }

      setRoomData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          players: prev.players.filter(
            (player: { id: string }) => player.id !== playerId
          ),
        };
      });
    });

    socket.on("newRound", () => {
      console.log(`Admin reset all points`);
    });

    socket.on("error", (message: string) => {
      console.log("socket received - ERROR: " + message);
      alert(message);
      window.location.href = "/";
    });

    socket.on("disconnect", () => {
      // if (playerName) {
      console.log("socket received - disconnect");
      // alert("Disconnected from server");
      // }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleRevealCards = () => {
    console.log("handleRevealCards");
    socket.emit("revealCards", roomId);
  };

  const handleJoinRoom = (data: { playerName?: string }) => {
    const nameNoWhiteSpace = data.playerName
      ? data.playerName.trim()
      : undefined;

    if (!nameNoWhiteSpace) return;

    socket.emit("joinRoom", { roomId, playerName: nameNoWhiteSpace });
    setJoinModal(false);
  };

  const handleRestartVoting = () => {
    console.log("handleRestartVoting");
    socket.emit("reset", roomId);
  };

  return (
    <div className="flex flex-col justify-between h-screen bg-slate-50">
      <div className="flex w-full">
        <p>Room administrator actions:</p>
        <Button onClick={handleRevealCards}>Reveal cards</Button>
        <Button onClick={handleRestartVoting}>Restart round</Button>
        <Button onClick={handleRevealCards}>End room</Button>
      </div>

      <Board
        players={roomData?.players}
        roomStatus={roomData?.status}
        mainPlayerIsAdmin={mainPlayer?.role === PlayerRolesEnum.ADMIN}
      />

      <div className="w-full">{mainPlayer?.canVote && <Deck />}</div>

      <Modal isOpen={joinModal} title={"Enter the room."}>
        <form onSubmit={playerInfoForm.handleSubmit(handleJoinRoom)}>
          <FormInput
            id="playerName"
            type="text"
            label="Player name:"
            register={playerInfoForm.register("playerName", {
              required: "The player's name is mandatory.",
            })}
            error={playerInfoForm.formState.errors.playerName}
          />

          <Button type="submit">Enter room</Button>
        </form>
      </Modal>
    </div>
  );
}

export default Room;
