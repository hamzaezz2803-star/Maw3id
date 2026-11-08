import Image from "next/image";
import { joindreClasses } from "@/lib/classes";
import { obtenirInitiales } from "@/lib/formatage";

export type TailleAvatar = "petit" | "moyen" | "grand";
export type FormeAvatar = "cercle" | "carre";

const CLASSES_TAILLE: Record<TailleAvatar, string> = {
  petit: "size-8 text-label",
  moyen: "size-9 text-label",
  grand: "size-12 text-body font-semibold",
};

const PIXELS_TAILLE: Record<TailleAvatar, number> = { petit: 32, moyen: 36, grand: 48 };

export interface ProprietesAvatar {
  nom: string;
  source?: string | null;
  taille?: TailleAvatar;
  /** Carré pour un logo d'organisation, cercle pour une personne. */
  forme?: FormeAvatar;
  className?: string;
}

export function Avatar({ nom, source, taille = "moyen", forme = "cercle", className }: ProprietesAvatar) {
  const classes = joindreClasses(
    "inline-flex shrink-0 select-none items-center justify-center overflow-hidden font-medium",
    forme === "cercle" ? "rounded-full" : "rounded-control",
    CLASSES_TAILLE[taille],
    className,
  );

  if (source) {
    return (
      <Image
        src={source}
        alt={nom}
        width={PIXELS_TAILLE[taille]}
        height={PIXELS_TAILLE[taille]}
        className={joindreClasses(classes, "object-cover")}
      />
    );
  }

  return (
    <span role="img" aria-label={nom} className={joindreClasses(classes, "bg-primary-subtle text-primary-hover")}>
      {obtenirInitiales(nom)}
    </span>
  );
}
