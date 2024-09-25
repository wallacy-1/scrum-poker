import { PokerCardPropsInterface } from "./interfaces";
import { pokerCardVariants } from "./styles";

const PokerCard = ({ color, highlight, children }: PokerCardPropsInterface) => {
  return (
    <div className={pokerCardVariants({ color, highlight })}>{children}</div>
  );
};

export default PokerCard;
