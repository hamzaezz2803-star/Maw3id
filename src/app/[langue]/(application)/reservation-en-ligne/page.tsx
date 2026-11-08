import { genererMetadonneesModule, ModuleAVenir } from "@/components/mise-en-page/ModuleAVenir";

export function generateMetadata() {
  return genererMetadonneesModule("reservation-en-ligne");
}

export default function Page() {
  return <ModuleAVenir idModule="reservation-en-ligne" />;
}
