"use client";

import { useEffect, useState } from "react";

type SnackbarProps = {
  message: string;
  open: boolean;
  onClose: () => void;
};

export function Snackbar({ message, open, onClose }: SnackbarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [open, onClose]);

  if (!open && !isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible && open
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="bg-error/95 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg border border-error/30 max-w-[90vw] sm:max-w-md text-sm font-medium">
        {message}
      </div>
    </div>
  );
}

