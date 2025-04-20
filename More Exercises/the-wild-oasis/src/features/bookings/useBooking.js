import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();
  //console.log(`bookingId: ${bookingId}`);

  const response = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  const {
    data: booking,
    isPending: isFetchingBooking,
    error: bookingLoadError,
  } = response;

  //console.log(`booking: ${JSON.stringify(booking)}`);
  return { booking, isFetchingBooking, bookingLoadError };
}
