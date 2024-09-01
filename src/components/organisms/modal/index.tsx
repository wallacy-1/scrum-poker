import React from "react";
import { ModalPropsInterface } from "./interfaces";

const Modal: React.FC<ModalPropsInterface> = ({
  isOpen,
  title,
  children,
  backgroundOpacity,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        backgroundOpacity ? "bg-gray-700/75" : "bg-gray-700/100"
      }`}
    >
      <div className="relative w-full max-w-lg p-6 mx-4 text-white bg-gray-800 rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
