import { useEffect } from "react";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

//create a dynamic Modal
const Modal = ({ isOpen, onClose, children }: ModalProps) => {

  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg min-w-[300px] w-full max-w-md">
        <button className="absolute top-4 right-6 text-gray-500" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
