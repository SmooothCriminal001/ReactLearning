import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const response = useMutation({
    mutationFn: ({ bookingId, breakfastDetails = {} }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfastDetails,
      }),
    onSuccess: (bookingData) => {
      toast.success(`Booking ${bookingData.id} successfully checked in.`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
  });

  const { isPending: isCheckingIn, mutate: checkIn } = response;
  console.group("response");
  console.dir(response);
  console.groupEnd();
  return { checkIn, isCheckingIn };
}
