const FormInput = ({ register, error, label, id, type }: any) => {
  return (
    <>
      <label className="block my-2 text-sm font-bold text-white" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        {...register}
        id={id}
        type={type}
      />
      {error?.message && <p role="alert">{error.message}</p>}
    </>
  );
};

export default FormInput;
