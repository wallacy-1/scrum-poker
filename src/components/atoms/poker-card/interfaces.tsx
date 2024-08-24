import React from "react";

export interface PokerCardPropsInterface {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}
