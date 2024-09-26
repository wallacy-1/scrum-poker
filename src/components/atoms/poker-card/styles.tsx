import { tv } from "tailwind-variants";

export const pokerCardVariants = tv({
  base: "flex flex-col justify-between h-40 px-1 mx-4 my-2 border-2 border-gray-800 rounded-md select-none w-28",
  variants: {
    color: {
      red: "bg-red-400",
      green: "bg-green-400",
      blue: "bg-blue-400",
    },
    highlight: {
      true: "border-4 border-gray-900",
    },
  },
  defaultVariants: {
    color: "red",
  },
});
