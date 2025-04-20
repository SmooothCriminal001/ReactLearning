import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (bookingData) => {
      toast.success(`Booking ${bookingData.id} successfully checked out.`);
      queryClient.invalidateQueries({ active: true });
    },
  });

  const { isPending: isCheckingOut, mutate: checkOut } = response;
  console.group("response");
  console.dir(response);
  console.groupEnd();
  return { checkOut, isCheckingOut };
}
