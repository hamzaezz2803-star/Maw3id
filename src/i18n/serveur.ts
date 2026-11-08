import { notFound } from "next/navigation";
import { langue as lireLangue } from "next/root-params";
import type { Langue } from "@/types";
import { estLangueValide } from "./config";
import { DICTIONNAIRES, type Dictionnaire } from "./dictionnaires";

/*
 * Accès à la langue depuis les Server Components, sans la passer en props :
 * `langue` est le paramètre racine de app/[langue].
 */

export async function obtenirLangue(): Promise<Langue> {
  const valeur = await lireLangue();
  if (!valeur || !estLangueValide(valeur)) notFound();
  return valeur;
}

export async function obtenirTraductions(): Promise<{ langue: Langue; t: Dictionnaire }> {
  const langue = await obtenirLangue();
  return { langue, t: DICTIONNAIRES[langue] };
}
