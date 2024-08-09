import { useForm } from "react-hook-form";
import { Board, Button, Deck, FormInput } from "../../components/atoms";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../services/scrum-poker/webSocketService";
import { getPlayer } from "../../utils/getPlayer.utils";
import { Modal } from "../../components/organisms";

interface Participant {
  id: string;
  name: string;
  choice: boolean;
}

function Room() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const player = useMemo(() => {
    return getPlayer(participants);
  }, [participants]);

  const [joinModal, setJoinModal] = useState(true);
  const [showCards, setShowCards] = useState(false);
  const { roomId } = useParams();
  const playerInfoForm = useForm();

  useEffect(() => {
    console.log("useEffect", socket.id);
    socket.connect();

    socket.on("newPlayer", (newPlayer) => {
      console.log("socket received - newPlayer: ", newPlayer);
      setParticipants(newPlayer);
    });

    socket.on("playerKicked", (playerId: string) => {
      if (playerId === socket.id) {
        alert("The admin kick you from room.");
        window.location.href = "/";
      }

      setParticipants((prev) => {
        return prev.filter(
          (participant: { id: string }) => participant.id !== playerId
        );
      });
    });

    socket.on("playerSelectedCard", (playerId) => {
      console.log(`PlayerId: ${playerId} has chosen a card!`);

      setParticipants((prevParticipants) => {
        return prevParticipants.map((participant) => {
          if (participant.id === playerId) {
            return { ...participant, choice: true };
          }
          return participant;
        });
      });
    });

    socket.on("newRound", () => {
      setShowCards(false);
      console.log(`Admin reset all points`);
    });

    socket.on("revealCards", (players) => {
      setShowCards(true);
      setParticipants(players);
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
    const { playerName } = data;

    if (!playerName) return;

    socket.emit("joinRoom", { roomId, playerName });
    setJoinModal(false);
  };

  const handleRestartVoting = () => {
    console.log("handleRestartVoting");
    socket.emit("reset");
  };

  return (
    <div className="flex flex-col justify-between h-screen">
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
      <div className="flex w-full justify-evenly">
        <div>
          <p>Players:</p>
          <Board participants={participants} showCards={showCards} />
        </div>
        <div>
          <p>Room administrator actions:</p>
          <Button onClick={handleRevealCards}>Reveal cards</Button>
          <Button onClick={handleRestartVoting}>Restart round</Button>
          <Button onClick={handleRevealCards}>End room</Button>
        </div>
      </div>
      <Deck />
    </div>
  );
}

export default Room;
