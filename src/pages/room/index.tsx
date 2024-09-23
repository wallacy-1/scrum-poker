import { useForm } from "react-hook-form";
import { Button, FormInput } from "../../components/atoms";
import { Deck, Board } from "../../components/molecules";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../services/scrum-poker/webSocketService";
import { getMainPlayer } from "../../utils";
import { Modal, Navbar } from "../../components/organisms";
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

  const mainPlayer: PlayerDataInterface | null = useMemo(() => {
    return getMainPlayer(roomData?.players);
  }, [roomData?.players]);

  const [joinModal, setJoinModal] = useState(true);
  const [showDeck, setShowDeck] = useState(false);
  const { roomId } = useParams();
  const playerInfoForm = useForm();
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

  const handleJoinRoom = (data: { playerName?: string }) => {
    const nameNoWhiteSpace = data.playerName
      ? data.playerName.trim()
      : undefined;

    if (!nameNoWhiteSpace) return;

    socket.emit("joinRoom", { roomId, playerName: nameNoWhiteSpace });
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
    <main className="flex flex-col justify-between h-screen bg-gray-700">
      <Navbar inviteModal />

      <Board
        players={roomData?.players}
        roomStatus={roomData?.status}
        mainPlayerIsAdmin={mainPlayer?.role === PlayerRolesEnum.ADMIN}
      />

      <div className="w-full mt-20 bg-gray-600">
        <div className="flex justify-center py-2 ">
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

      {joinModal && (
        <Modal title={t("screens.room.join")}>
        <form onSubmit={playerInfoForm.handleSubmit(handleJoinRoom)}>
          <FormInput
            id="playerName"
            type="text"
            label={t("screens.room.player_name_input")}
            register={playerInfoForm.register("playerName", {
              required: t("form_common.required_player_name_error"),
            })}
            error={playerInfoForm.formState.errors.playerName}
          />

            <div className="flex justify-end pt-2 mt-5 border-t">
          <Button type="submit">{t("screens.room.join")}</Button>
            </div>
        </form>
      </Modal>
      )}
    </main>
  );
}

export default Room;
