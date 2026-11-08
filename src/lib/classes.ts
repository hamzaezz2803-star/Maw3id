type ValeurClasse = string | false | null | undefined;

/** Assemble des noms de classes en ignorant les valeurs vides. */
export function joindreClasses(...classes: ValeurClasse[]): string {
  return classes.filter(Boolean).join(" ");
}
