"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Langue } from "@/types";
import { DICTIONNAIRES, type Dictionnaire } from "./dictionnaires";

interface ValeurTraductions {
  langue: Langue;
  t: Dictionnaire;
}

const ContexteTraductions = createContext<ValeurTraductions | null>(null);

/** Rend la langue et ses textes disponibles pour les Client Components. */
export function FournisseurTraductions({ langue, children }: { langue: Langue; children: ReactNode }) {
  return (
    <ContexteTraductions value={{ langue, t: DICTIONNAIRES[langue] }}>
      {children}
    </ContexteTraductions>
  );
}

export function useTraductions(): ValeurTraductions {
  const contexte = useContext(ContexteTraductions);
  if (!contexte) {
    throw new Error("useTraductions doit être utilisé dans <FournisseurTraductions>.");
  }
  return contexte;
}
