import { getModuleMetadata, ModulePlaceholder } from "@/components/layout/ModulePlaceholder";

export const metadata = getModuleMetadata("appointments");

export default function Page() {
  return <ModulePlaceholder moduleId="appointments" />;
}
