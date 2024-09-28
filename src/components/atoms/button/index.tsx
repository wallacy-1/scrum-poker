import React from "react";
import { ButtonPropsInterface } from "./interfaces";
import { buttonVariants } from "./styles";

const Button: React.FC<ButtonPropsInterface> = ({
  children,
  color,
  size,
  highlight,
  error,
  ...props
}) => {
  return (
    <button
      className={buttonVariants({ size, color, error, highlight })}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
