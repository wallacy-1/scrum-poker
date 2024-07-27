const Button = ({ children, ...props }: any) => {
  return (
    <button
      className="px-4 py-2 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
