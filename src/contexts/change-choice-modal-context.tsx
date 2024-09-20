import React, { createContext, useContext, useState } from "react";
import { ChangeChoiceModal } from "../components/molecules";

interface ChangeChoiceModalContextInterface {
  playerName: string;
  cardValues: string[];
  targetId: string;
  openChoiceModal: (name: string, cards: string[], id: string) => void;
  closeChoiceModal: () => void;
}

const ChangeChoiceModalContext = createContext<
  ChangeChoiceModalContextInterface | undefined
>(undefined);

export const ChangeChoiceModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [cardValues, setCardValues] = useState<string[]>([]);
  const [targetId, setTargetId] = useState<string>("");

  const openChoiceModal = (name: string, cards: string[], id: string) => {
    setPlayerName(name);
    setCardValues(cards);
    setTargetId(id);
    setIsOpen(true);
  };

  const closeChoiceModal = () => {
    setIsOpen(false);
  };

  return (
    <ChangeChoiceModalContext.Provider
      value={{
        playerName,
        cardValues,
        targetId,
        openChoiceModal,
        closeChoiceModal,
      }}
    >
      {children}
      {isOpen && <ChangeChoiceModal />}
    </ChangeChoiceModalContext.Provider>
  );
};

export const useChangeChoiceModal = () => {
  const context = useContext(ChangeChoiceModalContext);
  if (!context) {
    throw new Error(
      "useChangeChoiceModal must be used within a ChangeChoiceModalProvider"
    );
  }
  return context;
};
