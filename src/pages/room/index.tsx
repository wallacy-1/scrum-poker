import { Button } from "../../components/atoms";
import { Deck, Board, JoinRoomModal } from "../../components/molecules";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../services/web-socket-service";
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
    socket.connect();

    socket.on("roomUpdate", (newRoomData) => {
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
      alert(message);
      window.location.href = "/";
    });

    socket.on("disconnect", () => {
      alert("Disconnected from server");
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (roomData?.status) {
      let link: any = document.querySelector("link[rel*='icon']");

      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }

      if (roomData.status === RoomStatusEnum.VOTING) {
        document.title = t("dynamic_title.voting", {
          votedCount: roomData.votedPlayersCount,
          votingCount: roomData.votingPlayersCount,
        });
      } else {
        document.title = t("dynamic_title.reveal");
      }

      if (roomData.status === RoomStatusEnum.REVEAL) {
        link.href = "/favicon-blue.png";
      } else if (roomData.votingPlayersCount === 0) {
        link.href = "/favicon-green.png";
      } else if (roomData.votedPlayersCount >= roomData.votingPlayersCount) {
        link.href = "/favicon-yellow.png";
      } else {
        link.href = "/favicon-red.png";
      }
    }

    return () => {
      const link: any = document.querySelector("link[rel*='icon']");
      link.href = "/favicon-default.png";
      document.title = t("dynamic_title.default");
    };
  }, [
    roomData?.votedPlayersCount,
    roomData?.votingPlayersCount,
    roomData?.status,
    t,
  ]);

  const handleJoinRoom = (playerName: string) => {
    socket.emit("joinRoom", { roomId, playerName });
    setJoinModal(false);
  };

  const handleRevealCards = () => {
    socket.emit("revealCards", roomId);
  };

  const handleRestartVoting = () => {
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
