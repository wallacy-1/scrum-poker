import { useSpinner } from "../../../contexts";

const Spinner = () => {
  const { title } = useSpinner();

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center text-white bg-gray-700/85 transition-opacity duration-300"
      role="status"
      aria-live="polite"
    >
      <div className="w-12 h-12 mr-4 border-4 border-white rounded-full border-t-transparent animate-spin" />
      {title && <p className="text-2xl text-center text-white">{title}</p>}
    </div>
  );
};

export default Spinner;
