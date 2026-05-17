"use client";

import { useEffect } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function EditModal({ isOpen, onClose, children }: EditModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden"; // block scrolling
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div  
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          type="button"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
