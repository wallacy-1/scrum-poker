import socket from "../../../services/scrum-poker/webSocketService";
import Button from "../button";

const Board = ({ participants }: any) => {
  const handleKickPlayer = (playerId: string) => {
    console.log("handleKickPlayer - called with id: " + playerId);
    // verify if is admin
    socket.emit("kickPlayer", playerId);
  };

  return (
    <div className="flex flex-col board">
      {participants.map((player: any, index: string) => (
        <div key={index}>
          <div className="player-card">
            {player.name} - role: {player.role}
            {socket.id === player.id ? "(You)" : ""}
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
