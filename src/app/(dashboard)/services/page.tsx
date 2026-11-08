import { getModuleMetadata, ModulePlaceholder } from "@/components/layout/ModulePlaceholder";

export const metadata = getModuleMetadata("services");

export default function Page() {
  return <ModulePlaceholder moduleId="services" />;
}
