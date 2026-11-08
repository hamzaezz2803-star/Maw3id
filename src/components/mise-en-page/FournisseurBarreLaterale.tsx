"use client";

import { createContext, useContext, useRef, useState, type ReactNode, type RefObject } from "react";
import { REQUETE_MEDIA_BUREAU } from "@/constants";

interface ValeurBarreLaterale {
  /** Sur ordinateur uniquement : barre réduite à une colonne d'icônes. */
  estReduite: boolean;
  /** Réduit la barre sur ordinateur, ouvre le tiroir sur les écrans plus petits. */
  basculerBarreLaterale: () => void;
  fermerTiroir: () => void;
  refTiroir: RefObject<HTMLDialogElement | null>;
}

const ContexteBarreLaterale = createContext<ValeurBarreLaterale | null>(null);

export function FournisseurBarreLaterale({ children }: { children: ReactNode }) {
  const [estReduite, setEstReduite] = useState(false);
  const refTiroir = useRef<HTMLDialogElement>(null);

  function basculerBarreLaterale() {
    if (window.matchMedia(REQUETE_MEDIA_BUREAU).matches) {
      setEstReduite((reduite) => !reduite);
    } else {
      refTiroir.current?.showModal();
    }
  }

  function fermerTiroir() {
    refTiroir.current?.close();
  }

  return (
    <ContexteBarreLaterale value={{ estReduite, basculerBarreLaterale, fermerTiroir, refTiroir }}>
      {children}
    </ContexteBarreLaterale>
  );
}

export function useBarreLaterale(): ValeurBarreLaterale {
  const contexte = useContext(ContexteBarreLaterale);
  if (!contexte) {
    throw new Error("useBarreLaterale doit être utilisé dans <FournisseurBarreLaterale>.");
  }
  return contexte;
}
