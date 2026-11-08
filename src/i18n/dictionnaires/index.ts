import type { Langue } from "@/types";
import { ar } from "./ar";
import { fr, type Dictionnaire } from "./fr";

export type { Dictionnaire };

export const DICTIONNAIRES: Record<Langue, Dictionnaire> = { fr, ar };
