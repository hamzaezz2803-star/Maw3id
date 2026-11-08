import { getModuleMetadata, ModulePlaceholder } from "@/components/layout/ModulePlaceholder";

export const metadata = getModuleMetadata("availability");

export default function Page() {
  return <ModulePlaceholder moduleId="availability" />;
}
