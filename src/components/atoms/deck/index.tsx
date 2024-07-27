import Card from "../card";

const Deck = ({ onCardSelect }: any) => {
  const cardValues = [0, 1, 2, 3, 5, 8, 13, 20, 100];

  return (
    <div>
      <p>Cards</p>
      <div className="flex">
        {cardValues.map((value) => (
          <Card key={value} value={value} onClick={() => onCardSelect(value)} />
        ))}
      </div>
    </div>
  );
};

export default Deck;
