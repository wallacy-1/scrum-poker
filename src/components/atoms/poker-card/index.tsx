import { PokerCardPropsInterface } from "./interfaces";

const PokerCard = ({
  onClick,
  className,
  children,
}: PokerCardPropsInterface) => {
  return (
    <div
      className={`${className} flex flex-col justify-between h-40 px-1 mx-4 my-2 border-2 border-gray-500 rounded-md select-none w-28`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default PokerCard;
