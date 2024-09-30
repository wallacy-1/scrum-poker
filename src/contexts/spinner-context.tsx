import React, { createContext, useContext, useState } from "react";
import { Spinner } from "../components/molecules";

interface SpinnerContextInterface {
  title?: string;
  loading: boolean;
  setTitle: (title?: string) => void;
  setLoading: (state: boolean) => void;
}

const SpinnerContext = createContext<SpinnerContextInterface | undefined>(
  undefined
);

export const SpinnerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string | undefined>("");

  return (
    <SpinnerContext.Provider value={{ title, loading, setTitle, setLoading }}>
      {children}
      {loading && <Spinner />}
    </SpinnerContext.Provider>
  );
};

export const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error("useSpinner must be used within a SpinnerProvider");
  }
  return context;
};
