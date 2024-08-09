interface PokerCardProps {
  value: string | number;
  onClick: () => void;
}

const PokerCard = ({ value, onClick }: PokerCardProps) => {
  return (
    <div
      className="flex flex-col justify-between h-40 px-1 mx-4 my-2 border-2 rounded-md cursor-pointer select-none w-28"
      onClick={onClick}
    >
      <p className="text-xl text-start">{value}</p>
      <p className="text-4xl text-center">{value}</p>
      <p className="text-xl text-end">{value}</p>
    </div>
  );
};

export default PokerCard;
