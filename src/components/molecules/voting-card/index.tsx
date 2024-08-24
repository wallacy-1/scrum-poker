import socket from "../../../services/scrum-poker/webSocketService";
import { PokerCard } from "../../atoms";
import { VotingCardPropsInterface } from "./interfaces";

const VotingCard = ({ value }: VotingCardPropsInterface) => {
  const handleCardSelect = () => {
    socket.emit("chooseCard", value);
  };

  return (
    <PokerCard className="cursor-pointer" onClick={() => handleCardSelect()}>
      <p className="text-xl text-start">{value}</p>
      <p className="text-4xl text-center">{value}</p>
      <p className="text-xl text-end">{value}</p>
    </PokerCard>
  );
};

export default VotingCard;
