import { Button } from "../../components/atoms";
import { Deck, Board, JoinRoomModal } from "../../components/molecules";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../services/web-socket-service";
import { getMainPlayer, updateFavicon } from "../../utils";
import { Navbar } from "../../components/organisms";
import {
  PlayerDataInterface,
  PlayerRolesEnum,
  RoomDataInterface,
  RoomStatusEnum,
} from "./interfaces";
import { useTranslation } from "react-i18next";
import { useChangeNameModal, useSpinner } from "../../contexts";
import axiosInstance from "../../services/axios-instance";

function Room() {
  const { t } = useTranslation();
  const [roomData, setRoomData] = useState<RoomDataInterface>();
  const [joinModal, setJoinModal] = useState(false);
  const [showDeck, setShowDeck] = useState(true);
  const { setRoomId } = useChangeNameModal();
  const { setLoading } = useSpinner();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const mainPlayer: PlayerDataInterface | null = useMemo(() => {
    return getMainPlayer(roomData?.players);
  }, [roomData?.players]);

  const canVoteAndIsVoting =
    mainPlayer?.canVote && roomData?.status === RoomStatusEnum.VOTING;

  useEffect(() => {
    setLoading(true);

    const validateRoom = async () => {
      try {
        await axiosInstance.get("/scrumPoker/" + roomId);

        setRoomId(roomId);
        setJoinModal(true);
      } catch (error) {
        alert(t("screens.room.room_not_found"));
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    validateRoom();
  }, [navigate, roomId, setLoading, setRoomId, t]);

  useEffect(() => {
    socket.connect();

    socket.on("roomUpdate", (newRoomData) => {
      setRoomData(newRoomData);
    });

    socket.on("playerKicked", (playerId: string) => {
      if (playerId === socket.id) {
        alert("The admin kick you from room.");
        navigate("/");
        setRoomData(undefined);
      }
    });

    socket.on("error", (message: string) => {
      alert(message);
      navigate("/");
    });

    socket.on("disconnect", () => {
      alert("Disconnected from server");
      navigate("/");
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [navigate]);

  useEffect(() => {
    if (roomData?.status) {
      if (roomData.status === RoomStatusEnum.VOTING) {
        document.title = t("dynamic_title.voting", {
          votedCount: roomData.votedPlayersCount,
          votingCount: roomData.votingPlayersCount,
        });
      } else {
        document.title = t("dynamic_title.reveal");
      }

      if (roomData.status === RoomStatusEnum.REVEAL) {
        updateFavicon("/favicon-blue.png");
      } else if (roomData.votingPlayersCount === 0) {
        updateFavicon("/favicon-green.png");
      } else if (roomData.votedPlayersCount >= roomData.votingPlayersCount) {
        updateFavicon("/favicon-yellow.png");
      } else {
        updateFavicon("/favicon-red.png");
      }
    }

    return () => {
      updateFavicon("/favicon-default.png");
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

      {joinModal && <JoinRoomModal roomId={roomId} onSubmit={handleJoinRoom} />}
    </main>
  );
}

export default Room;
