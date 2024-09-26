import React from "react";
import { pokerCardVariants } from "./styles";
import { VariantProps } from "tailwind-variants";

export interface PokerCardPropsInterface
  extends VariantProps<typeof pokerCardVariants> {
  className?: string;
  children: React.ReactNode;
}
