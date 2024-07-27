const Board = ({ players, playerCards, showCards }: any) => {
  return (
    <div className="board">
      {players.map((player: any) => (
        <div key={player} className="player-card">
          {player}: {showCards ? playerCards[player] : "..."}
        </div>
      ))}
    </div>
  );
};

export default Board;
