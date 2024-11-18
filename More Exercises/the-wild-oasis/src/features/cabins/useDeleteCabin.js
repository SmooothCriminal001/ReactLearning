import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin(cabin) {
  const queryClient = useQueryClient();

  const deletionResponse = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success(`Cabin-${cabin.id} deleted successfully`);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const { isPending: isDeleting, mutate: deleteCabin } = deletionResponse;
  /*
  console.group("deletionResponse");
  console.dir(deletionResponse);
  console.groupEnd();
  */

  return { isDeleting, deleteCabin };
}
