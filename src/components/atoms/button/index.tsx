import { ButtonPropsInterface } from "./interfaces";
import { buttonVariants } from "./styles";

const Button = ({ children, color, size, ...props }: ButtonPropsInterface) => {
  return (
    <button
      className={buttonVariants({ size: size, color: color })}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
