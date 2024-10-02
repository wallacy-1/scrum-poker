import { useEffect, useState } from "react";
import { Button } from "../../atoms";
import { PlayerCard } from "../../organisms";
import { BoardPropsInterface } from "./interfaces";
import { useTranslation } from "react-i18next";
import { RoomStatusEnum } from "../../../pages/room/interfaces";

const Board = ({ roomData, mainPlayerIsAdmin }: BoardPropsInterface) => {
  const { t } = useTranslation("", {
    keyPrefix: "molecules.board",
  });

  const {
    players,
    status,
    averageChoice,
    votedPlayersCount,
    votingPlayersCount,
  } = roomData ?? {};

  const minChoiceStr = String(roomData?.minChoice);
  const maxChoiceStr = String(roomData?.maxChoice);

  const [voteHighlighted, setVoteHighlighted] = useState<
    string | boolean | undefined
  >(undefined);

  const handleHighlight = (choice?: string | boolean) => {
    setVoteHighlighted(voteHighlighted === choice ? undefined : choice);
  };

  useEffect(() => {
    setVoteHighlighted(undefined);
  }, [roomData?.status]);

  return (
    <div className="flex flex-col justify-between flex-grow text-white bg-gray-700 min-h-80">
      {averageChoice !== undefined && (
        <div className="grid self-start grid-cols-3 gap-3 pt-1 pl-5 text-center">
          <p>{t("min")}</p>
          <p>{t("max")}</p>
          <p>{t("average")}</p>

          <Button
            size="lg"
            highlight={voteHighlighted === minChoiceStr}
            onClick={() => handleHighlight(minChoiceStr)}
          >
            {minChoiceStr}
          </Button>
          <Button
            size="lg"
            color="danger"
            highlight={voteHighlighted === maxChoiceStr}
            onClick={() => handleHighlight(maxChoiceStr)}
          >
            {maxChoiceStr}
          </Button>
          <Button size="lg" color="warning">
            {averageChoice}
          </Button>
        </div>
      )}
      {status === RoomStatusEnum.VOTING && (
        <div className="grid self-start grid-cols-2 gap-2.5 pt-1 pl-5 text-center">
          <p>{t("Voted")}</p>
          <p>{t("Voting")}</p>

          <Button
            size="lg"
            color="success"
            onClick={() => handleHighlight(true)}
            highlight={voteHighlighted === true}
          >
            {votedPlayersCount}
          </Button>
          <Button
            size="lg"
            color="danger"
            onClick={() => handleHighlight(false)}
            highlight={voteHighlighted === false}
          >
            {votingPlayersCount}
          </Button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center flex-grow pt-5 pb-5">
        <div className="flex flex-wrap justify-center gap-2">
          {players?.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              roomStatus={status}
              mainPlayerIsAdmin={mainPlayerIsAdmin}
              isHighlighted={voteHighlighted === player.choice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
