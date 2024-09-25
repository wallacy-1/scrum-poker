import { useEffect, useState } from "react";
import socket from "../../../services/scrum-poker/webSocketService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { DeckPropsInterface } from "./interfaces";

//=> will be removed in the future with custom choices
const fibonacciDefault = [
  "☕",
  "0",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "21",
  "34",
  "55",
  "89",
  "?",
];

const Deck = ({ onClose, show, mainPlayerChoice }: DeckPropsInterface) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  useEffect(() => {
    if (mainPlayerChoice === false) {
      setSelectedValue(null);
    }
  }, [mainPlayerChoice]);

  const handleCardSelect = (value: string | string) => {
    setSelectedValue(value);
    socket.emit("chooseCard", value);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="w-full bg-gray-800">
      <div className="w-full text-right">
        <FontAwesomeIcon
          className="px-1 pt-1 mt-1 mr-3 cursor-pointer"
          icon={faXmark}
          onClick={() => onClose()}
          color="#ffffff"
          role="button"
          size="xl"
          aria-label="Close"
        />
      </div>
      <div className="flex flex-wrap justify-center w-full px-4 pb-2 select-none grow">
        {fibonacciDefault.map((cardValue, index) => (
          <div
            key={index}
            role="button"
            aria-label={`Card ${cardValue}`}
            className={`pt-10 w-24 text-4xl h-32 text-center mb-2 mx-2 rounded cursor-pointer ${
              cardValue === selectedValue ? "bg-green-400" : "bg-slate-200"
            }`}
            onClick={() => handleCardSelect(cardValue)}
          >
            {cardValue}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deck;
