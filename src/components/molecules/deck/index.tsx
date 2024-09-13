import { useEffect, useState } from "react";
import { VotingCard } from "..";
import socket from "../../../services/scrum-poker/webSocketService";

const Deck = () => {
  const cardValues = [0, 1, 2, 3, 5, 8, 13, 20, 100];
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  useEffect(() => {
    socket.on("choiceReset", () => {
      setSelectedValue(null);
    });
  }, []);

  const handleCardSelect = (value: number) => {
    setSelectedValue(value);
    socket.emit("chooseCard", value);
  };

  return (
    <div>
      <div className="flex flex-wrap w-full px-4 pb-2 grow">
        {cardValues.map((value) => (
          <VotingCard
            key={value}
            value={value}
            isSelected={value === selectedValue}
            onSelect={() => handleCardSelect(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
