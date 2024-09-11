import { useState } from "react";
import ToastContext from "../../context/ToastContext";
import { IconX, IconCheck, IconInfoCircle } from "@tabler/icons-react";

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const open = (message, type = "info") => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const close = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <IconCheck size={20} color="white" />;
      case "error":
        return <IconX size={20} color="red" className="rounded-full border-2 border-red-600" />;
      case "info":
        return <IconInfoCircle size={20} color="white" />;
      default:
        return null;
    }
  };
  return (
    <ToastContext.Provider value={{ open, close }}>
      {children}
      <div className="fixed top-24 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex mt-2 items-center gap-2 p-4 rounded-lg shadow-lg transition ease-in-out duration-300 delay-200 ${
              toast.type === "success"
                ? "bg-green-400 text-white"
                : toast.type === "error"
                ? "bg-red-400 text-white"
                : "bg-gray-400 text-white"
            }`}
          >
            {getIcon(toast.type)}
            <div className="flex-1 text-sm">
              <p>{toast.message}</p>
            </div>
            <button
              onClick={() => close(toast.id)}
              className="absolute top-1 right-2 text-lg font-bold"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
