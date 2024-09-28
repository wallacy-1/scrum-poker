import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  base: "font-medium text-white rounded-xl active:opacity-80 font-bold",
  variants: {
    color: {
      primary: "bg-blue-600 text-white",
      warning: "bg-yellow-600 text-white",
      danger: "bg-red-600 text-white",
      success: "bg-green-600 text-white",
    },
    error: {
      true: "cursor-not-allowed",
    },
    size: {
      md: "px-4 py-1.5",
      lg: "px-5 py-2 text-2xl",
    },
    highlight: {
      true: "outline outline-offset-2 outline-2 outline-gray-800",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});
