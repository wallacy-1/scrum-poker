import React from "react";
import { buttonVariants } from "./styles";
import { VariantProps } from "tailwind-variants";

export interface ButtonPropsInterface
  extends VariantProps<typeof buttonVariants>,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  children: React.ReactNode;
}
