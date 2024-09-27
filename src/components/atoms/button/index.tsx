import React from "react";
import { ButtonPropsInterface } from "./interfaces";
import { buttonVariants } from "./styles";

const Button: React.FC<ButtonPropsInterface> = ({
  children,
  color,
  size,
  error,
  ...props
}) => {
  return (
    <button
      className={buttonVariants({ size, color, error })}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
