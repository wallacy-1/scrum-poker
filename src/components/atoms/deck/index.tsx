import socket from "../../../services/scrum-poker/webSocketService";
import PokerCard from "../poker-card";

const Deck = () => {
  const cardValues = [0, 1, 2, 3, 5, 8, 13, 20, 100];

  const handleCardSelect = (card: number) => {
    socket.emit("chooseCard", card);
  };

  return (
    <div>
      <div className="flex flex-wrap w-full px-4 pb-2 grow">
        {cardValues.map((value) => (
          <PokerCard
            key={value}
            value={value}
            onClick={() => handleCardSelect(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
