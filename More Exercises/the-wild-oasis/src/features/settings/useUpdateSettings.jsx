import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingFn } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationFn: updateSettingFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Setting updated");
    },
    onError: (err) => console.log(`Error on updating settings: ${err.message}`),
  });

  const { isPending: isUpdatingSettings, mutate: updateSettings } = response;
  console.group("response");
  console.dir(response);
  console.groupEnd();

  return { isUpdatingSettings, updateSettings };
}
