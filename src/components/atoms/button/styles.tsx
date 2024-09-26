import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  base: "font-medium text-white rounded-xl active:opacity-80 font-bold",
  variants: {
    color: {
      primary: "bg-blue-600 text-white",
      warning: "bg-yellow-600 text-white",
      danger: "bg-red-600 text-white",
    },
    size: {
      md: "px-4 py-1.5",
      lg: "px-5 py-2 text-2xl",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});
