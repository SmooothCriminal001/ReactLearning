import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const response = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  const {
    data: bookings,
    isPending: isLoading,
    error: bookingsLoadError,
  } = response;

  return { bookings, isLoading, bookingsLoadError };
}
