import { PokerCardPropsInterface } from "./interfaces";
import { pokerCardVariants } from "./styles";

const PokerCard = ({
  onClick,
  color,
  highlight,
  children,
}: PokerCardPropsInterface) => {
  return (
    <div className={pokerCardVariants({ color, highlight })} onClick={onClick}>
      {children}
    </div>
  );
};

export default PokerCard;
