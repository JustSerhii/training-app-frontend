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
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close" type="button">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
