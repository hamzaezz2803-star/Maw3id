"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export type ModalSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: ModalSize;
  /** Actions shown at the bottom, e.g. Cancel and Confirm buttons. */
  footer?: ReactNode;
  children?: ReactNode;
}

/**
 * Built on the native <dialog>: focus trap, Escape to close and an inert
 * background come from the browser.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  footer,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  // Syncs the `open` prop with the imperative dialog API.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      // A click on the dialog element itself is a click on the backdrop.
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className={cn(
        "m-auto w-[calc(100%-2rem)] rounded-card border border-border bg-surface p-0 text-fg shadow-popover",
        SIZE_CLASSES[size],
      )}
    >
      <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6">
        <div className="flex flex-col gap-1">
          <h2 id={titleId} className="text-section-title">
            {title}
          </h2>
          {description && (
            <p id={descriptionId} className="text-helper text-fg-secondary">
              {description}
            </p>
          )}
        </div>
        <Button variant="ghost" size="icon" aria-label="Close" onClick={onClose} className="-me-2 -mt-2">
          <X aria-hidden="true" />
        </Button>
      </div>
      {children && <div className="px-5 py-4 sm:px-6">{children}</div>}
      {footer && (
        <div className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          {footer}
        </div>
      )}
    </dialog>
  );
}
