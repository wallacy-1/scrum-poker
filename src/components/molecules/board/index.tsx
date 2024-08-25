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
          id={player.id}
          roomStatus={roomStatus}
          name={player.name}
          choice={player.choice}
          role={player.role}
          canVote={player.canVote}
          mainPlayerIsAdmin={mainPlayerIsAdmin}
        />
      ))}
    </div>
  );
};

export default Board;
