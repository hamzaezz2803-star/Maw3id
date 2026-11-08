import { genererMetadonneesModule, ModuleAVenir } from "@/components/mise-en-page/ModuleAVenir";

export function generateMetadata() {
  return genererMetadonneesModule("disponibilites");
}

export default function Page() {
  return <ModuleAVenir idModule="disponibilites" />;
}
