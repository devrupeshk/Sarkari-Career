import { useGlobalData } from "@/components/GlobalDataProvider";
import { type ApiSettings } from "@/lib/api";

export function useSettings(): ApiSettings {
  const { settings } = useGlobalData();
  return settings;
}
