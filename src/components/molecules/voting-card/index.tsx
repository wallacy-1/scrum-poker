import { PokerCard } from "../../atoms";
import { VotingCardPropsInterface } from "./interfaces";

const VotingCard = ({
  value,
  onSelect,
  isSelected,
}: VotingCardPropsInterface) => {
  return (
    <PokerCard
      className={`cursor-pointer ${
        isSelected ? "bg-green-400" : "bg-slate-200"
      }`}
      onClick={onSelect}
    >
      <p className="text-xl text-start">{value}</p>
      <p className="text-4xl text-center">{value}</p>
      <p className="text-xl text-end">{value}</p>
    </PokerCard>
  );
};

export default VotingCard;
