import React from "react";
import { formInputVariants } from "./styles";
import { FormInputPropsInterface } from "./interfaces";

const FormInput: React.FC<FormInputPropsInterface> = ({
  register,
  error,
  label,
  id,
  type,
}) => {
  return (
    <>
      <label className="block my-2 text-sm font-bold text-white" htmlFor={id}>
        {label}
      </label>
      <input
        className={formInputVariants({ error: !!error })}
        {...register}
        id={id}
        type={type}
      />
      {error?.message && (
        <p role="alert" className="text-red-500">
          {error.message}
        </p>
      )}
    </>
  );
};

export default FormInput;
