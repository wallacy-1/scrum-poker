import { UseFormRegisterReturn } from "react-hook-form";

export interface FormInputPropsInterface
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  error?: {
    message?: string;
  };
  label: string;
  id: string;
}
