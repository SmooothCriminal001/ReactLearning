import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useTodayActivity() {
  const response = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  const {
    data: todayActivity,
    isPending: isFetchingTodayActivity,
    error,
  } = response;

  if (error) {
    toast.error(`Error while fetching today's activities: ${error.message}`);
  }

  return { todayActivity, isFetchingTodayActivity };
}
