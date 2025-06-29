import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const daysNumber = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const startDate = subDays(new Date(), daysNumber).toISOString();

  const response = useQuery({
    queryKey: ["stays", `last_${daysNumber}`],
    queryFn: () => getStaysAfterDate(startDate),
  });

  const {
    data: recentStays,
    isPending: isFetchingRecentStays,
    error,
  } = response;

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  if (error) {
    toast.error(`Error while fetching recent bookings: ${error.message}`);
    return;
  }

  return { recentStays, isFetchingRecentStays, confirmedStays, daysNumber };
}
