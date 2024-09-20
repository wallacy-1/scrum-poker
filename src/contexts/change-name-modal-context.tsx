import React, { createContext, useContext, useState } from "react";
import { ChangeNameModal } from "../components/molecules";

interface ChangeNameModalContextInterface {
  oldName: string;
  targetId: string;
  openNameModal: (name: string, id: string) => void;
  closeNameModal: () => void;
}

const ChangeNameModalContext = createContext<
  ChangeNameModalContextInterface | undefined
>(undefined);

export const ChangeNameModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [oldName, setOldName] = useState<string>("");
  const [targetId, setTargetId] = useState<string>("");

  const openNameModal = (name: string, id: string) => {
    setOldName(name);
    setTargetId(id);
    setIsOpen(true);
  };

  const closeNameModal = () => {
    setIsOpen(false);
  };

  return (
    <ChangeNameModalContext.Provider
      value={{ oldName, targetId, openNameModal, closeNameModal }}
    >
      {children}
      {isOpen && <ChangeNameModal />}
    </ChangeNameModalContext.Provider>
  );
};

export const useChangeNameModal = () => {
  const context = useContext(ChangeNameModalContext);
  if (!context) {
    throw new Error(
      "useChangeNameModal must be used within a ChangeNameModalProvider"
    );
  }
  return context;
};
