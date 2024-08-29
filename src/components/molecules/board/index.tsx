import { PlayerCard } from "../../organisms";
import { BoardPropsInterface } from "./interfaces";

const Board = ({
  players,
  roomStatus,
  mainPlayerIsAdmin,
}: BoardPropsInterface) => {
  if (!players) return null;

  return (
    <div className="flex w-full board">
      {players.map((player, index: number) => (
        <PlayerCard
          key={index}
          player={player}
          roomStatus={roomStatus}
          mainPlayerIsAdmin={mainPlayerIsAdmin}
        />
      ))}
    </div>
  );
};

export default Board;
