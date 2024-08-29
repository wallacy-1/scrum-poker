import { PlayerCard } from "../../organisms";
import { BoardPropsInterface } from "./interfaces";

const Board = ({
  players,
  roomStatus,
  mainPlayerIsAdmin,
}: BoardPropsInterface) => {
  if (!players) return null;

  return (
    <div className="flex flex-wrap w-full">
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
