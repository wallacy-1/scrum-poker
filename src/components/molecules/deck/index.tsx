import { VotingCard } from "..";

const Deck = () => {
  const cardValues = [0, 1, 2, 3, 5, 8, 13, 20, 100];

  return (
    <div>
      <div className="flex flex-wrap w-full px-4 pb-2 grow">
        {cardValues.map((value) => (
          <VotingCard key={value} value={value} />
        ))}
      </div>
    </div>
  );
};

export default Deck;
