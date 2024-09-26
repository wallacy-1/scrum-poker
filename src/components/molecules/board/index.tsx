import { useEffect, useState } from "react";
import { Button } from "../../atoms";
import { PlayerCard } from "../../organisms";
import { BoardPropsInterface } from "./interfaces";
import { useTranslation } from "react-i18next";

const Board = ({ roomData, mainPlayerIsAdmin }: BoardPropsInterface) => {
  const { t } = useTranslation("", {
    keyPrefix: "molecules.board",
  });
  const { players, status, minChoice, maxChoice, averageChoice } =
    roomData ?? {};
  const [voteHighlighted, setVoteHighlighted] = useState<number | undefined>(
    undefined
  );

  const handleHighlight = (choice?: number) => {
    setVoteHighlighted(voteHighlighted === choice ? undefined : choice);
  };

  useEffect(() => {
    setVoteHighlighted(undefined);
  }, [roomData?.status]);

  return (
    <div className="flex flex-col justify-between flex-grow">
      {averageChoice !== undefined && (
        <div className="grid self-start grid-cols-3 gap-3 pt-1 pl-5 text-center">
          <p className="text-white">{t("min")}</p>
          <p className="text-white">{t("max")}</p>
          <p className="text-white">{t("average")}</p>

          <Button size="lg" onClick={() => handleHighlight(minChoice)}>
            {minChoice}
          </Button>
          <Button
            size="lg"
            color="danger"
            onClick={() => handleHighlight(maxChoice)}
          >
            {maxChoice}
          </Button>
          <Button size="lg" color="warning">
            {averageChoice}
          </Button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center flex-grow">
        <div className="flex">
          {players?.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              roomStatus={status}
              mainPlayerIsAdmin={mainPlayerIsAdmin}
              isHighlighted={voteHighlighted === Number(player.choice)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
