import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const response = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const {
    data: settings,
    isPending: isFetchingSettings,
    error: settingsFetchError,
  } = response;
  console.log(response);

  return { settings, isFetchingSettings, settingsFetchError };
}
