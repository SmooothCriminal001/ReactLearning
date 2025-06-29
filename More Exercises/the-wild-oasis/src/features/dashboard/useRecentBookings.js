import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import {
  getBookingsAfterDate,
  getStaysAfterDate,
} from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const daysNumber = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const startDate = subDays(new Date(), daysNumber).toISOString();

  const response = useQuery({
    queryKey: ["bookings", `last_${daysNumber}`],
    queryFn: () => getBookingsAfterDate(startDate),
  });

  const {
    data: recentBookings,
    isPending: isFetchingRecentBookings,
    error,
  } = response;

  if (error) {
    toast.error(`Error while fetching recent bookings: ${error.message}`);
    return;
  }

  return { recentBookings, isFetchingRecentBookings };
}
