import { tv } from "tailwind-variants";

export const formInputVariants = tv({
  base: "w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline",
  variants: {
    error: {
      true: "border-red-500 text-white",
    },
  },
});
