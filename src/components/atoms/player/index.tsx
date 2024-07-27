const Player = ({ name, selectedCard }: any) => {
  return (
    <div>
      <p>Player info:</p>
      <h3>{name}</h3>
      {selectedCard !== null && (
        <div className="selected-card">{selectedCard}</div>
      )}
    </div>
  );
};

export default Player;
