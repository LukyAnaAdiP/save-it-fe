import React from "react";
import { IconX } from "@tabler/icons-react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 overflow-auto">
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-2/5 h-4/5 max-w-4xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10"
          aria-label="Close"
        >
          <IconX size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
