import type { HTMLAttributes } from "react";
import { joindreClasses } from "@/lib/classes";

type ProprietesDiv = HTMLAttributes<HTMLDivElement>;

export function Carte({ className, ...proprietes }: ProprietesDiv) {
  return (
    <div
      className={joindreClasses("rounded-card border border-border bg-surface shadow-card", className)}
      {...proprietes}
    />
  );
}

export function EnteteCarte({ className, ...proprietes }: ProprietesDiv) {
  return <div className={joindreClasses("flex flex-col gap-1 px-5 pt-5 sm:px-6 sm:pt-6", className)} {...proprietes} />;
}

export function TitreCarte({ className, ...proprietes }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={joindreClasses("text-card-title text-fg", className)} {...proprietes} />;
}

export function DescriptionCarte({ className, ...proprietes }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={joindreClasses("text-helper text-fg-secondary", className)} {...proprietes} />;
}

export function ContenuCarte({ className, ...proprietes }: ProprietesDiv) {
  return <div className={joindreClasses("p-5 sm:p-6", className)} {...proprietes} />;
}

export function PiedCarte({ className, ...proprietes }: ProprietesDiv) {
  return (
    <div
      className={joindreClasses(
        "flex flex-wrap items-center justify-end gap-3 border-t border-border px-5 py-4 sm:px-6",
        className,
      )}
      {...proprietes}
    />
  );
}
