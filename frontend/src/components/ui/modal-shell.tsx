"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

type ModalShellProps = {
  open: boolean;
  drawer?: boolean;
  onClose: () => void;
  children: ReactNode;
};

// One native dialog hosts each modal view, preserving focus when switching views.
export default function ModalShell({ open, drawer = false, onClose, children }: ModalShellProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    if (!open && dialog.current?.open) dialog.current.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      className={`app-dialog ${drawer ? "drawer-dialog" : ""}`}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClose={onClose}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
    >
      <button className="dialog-close" aria-label="Đóng" onClick={onClose}><X size={20} /></button>
      {children}
    </dialog>
  );
}
