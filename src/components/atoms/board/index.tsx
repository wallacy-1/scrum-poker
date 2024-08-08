import { kickPlayer } from "../../../services/scrum-poker/webSocketService";
import Button from "../button";

const Board = ({ players, playerCards }: any) => {
  const handleKickPlayer = (playerId: string) => {
    console.log("handleKickPlayer - called with id: " + playerId);
    // verify if is admin
    kickPlayer(playerId);
  };

  return (
    <div className="flex flex-col board">
      {players.map((player: any, index: string) => (
        <div key={index}>
          <div className="player-card">
            {player.id} - role: {player.role}
          </div>
          {/* only show if user is admin */}
          <Button onClick={() => handleKickPlayer(player.id)}>
            Kick Player
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Board;
