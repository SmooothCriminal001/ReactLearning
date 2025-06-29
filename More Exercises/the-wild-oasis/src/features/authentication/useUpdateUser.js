import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as updateUserAPI } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationFn: updateUserAPI,
    onSuccess: () => {
      toast.success("User account updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const { isPending: isUpdatingUser, mutate: updateUser } = response;

  return { isUpdatingUser, updateUser };
}
