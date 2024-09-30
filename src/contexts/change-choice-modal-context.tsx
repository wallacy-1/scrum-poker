import React, { createContext, useContext, useMemo, useState } from "react";
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

  const contextValue = useMemo(
    () => ({
      playerName,
      cardValues,
      targetId,
      openChoiceModal,
      closeChoiceModal,
    }),
    [playerName, cardValues, targetId]
  );

  return (
    <ChangeChoiceModalContext.Provider value={contextValue}>
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
