import { useId, type InputHTMLAttributes } from "react";
import { joindreClasses } from "@/lib/classes";

export interface ProprietesCaseACocher extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  libelle: string;
  description?: string;
}

export function CaseACocher({ id, libelle, description, className, ...proprietes }: ProprietesCaseACocher) {
  const idGenere = useId();
  const idCase = id ?? idGenere;
  const idDescription = description ? `${idCase}-description` : undefined;

  return (
    // Le libellé cliquable fait de toute la ligne la zone tactile (44 px minimum sur mobile).
    <div className={joindreClasses("flex min-h-11 items-start gap-3 py-2.5 sm:min-h-0 sm:py-0", className)}>
      <input
        id={idCase}
        type="checkbox"
        aria-describedby={idDescription}
        className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary disabled:cursor-not-allowed"
        {...proprietes}
      />
      <div className="flex flex-col">
        <label htmlFor={idCase} className="cursor-pointer text-label text-fg">
          {libelle}
        </label>
        {description && (
          <p id={idDescription} className="text-helper text-fg-secondary">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
