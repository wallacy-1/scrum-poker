import { Button } from "../../components/atoms";
import { Deck, Board, JoinRoomModal } from "../../components/molecules";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../services/scrum-poker/webSocketService";
import { getMainPlayer } from "../../utils";
import { Navbar } from "../../components/organisms";
import {
  PlayerDataInterface,
  PlayerRolesEnum,
  RoomDataInterface,
  RoomStatusEnum,
} from "./interfaces";
import { useTranslation } from "react-i18next";

function Room() {
  const { t } = useTranslation();
  const [roomData, setRoomData] = useState<RoomDataInterface>();
  const [joinModal, setJoinModal] = useState(true);
  const [showDeck, setShowDeck] = useState(true);

  const { roomId } = useParams();

  const mainPlayer: PlayerDataInterface | null = useMemo(() => {
    return getMainPlayer(roomData?.players);
  }, [roomData?.players]);

  const canVoteAndIsVoting =
    mainPlayer?.canVote && roomData?.status === RoomStatusEnum.VOTING;

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
        setRoomData(undefined);
      }
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
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  const handleJoinRoom = (playerName: string) => {
    socket.emit("joinRoom", { roomId, playerName });
    setJoinModal(false);
  };

  const handleRevealCards = () => {
    console.log("handleRevealCards");
    socket.emit("revealCards", roomId);
  };

  const handleRestartVoting = () => {
    console.log("handleRestartVoting");
    socket.emit("reset", roomId);
  };

  return (
    <main className="flex flex-col h-screen bg-gray-700">
      <Navbar inviteModal />

      <Board
        roomData={roomData}
        mainPlayerIsAdmin={mainPlayer?.role === PlayerRolesEnum.ADMIN}
      />

      <div className="w-full mt-2 align-bottom bg-gray-600">
        <div className="flex justify-center gap-3 py-2">
          {canVoteAndIsVoting && (
            <Button onClick={() => setShowDeck(!showDeck)}>
              {t(`screens.room.vote_button_${showDeck ? "hide" : "show"}`)}
            </Button>
          )}

          {mainPlayer?.role === PlayerRolesEnum.ADMIN && (
            <>
              <Button onClick={handleRevealCards}>
                {t("screens.room.reveal_cards")}
              </Button>
              <Button onClick={handleRestartVoting}>
                {t("screens.room.restart_voting")}
              </Button>
            </>
          )}
        </div>

        <Deck
          show={Boolean(showDeck && canVoteAndIsVoting)}
          mainPlayerChoice={mainPlayer?.choice}
          onClose={() => setShowDeck(false)}
        />
      </div>

      {joinModal && <JoinRoomModal onSubmit={handleJoinRoom} />}
    </main>
  );
}

export default Room;
