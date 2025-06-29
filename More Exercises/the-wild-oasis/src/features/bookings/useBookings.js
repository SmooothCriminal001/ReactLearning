import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { RECORDS_IN_A_PAGE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [params] = useSearchParams();
  const status = params.get("status");
  const sortParam = params.get("sortBy") || "startDate-desc";
  const pageParam = params.get("page") ? Number(params.get("page")) : 1;

  const filter =
    !status || status === "all" ? null : { field: "status", value: status };

  const sortBy = {
    field: sortParam.split("-")[0],
    sortByAscending: sortParam.split("-")[1] === "asc" ? true : false,
  };

  const response = useQuery({
    queryKey: ["bookings", filter, sortBy, pageParam],
    queryFn: () =>
      getBookings({ filter: filter, sortBy: sortBy, page: pageParam }),
  });

  const {
    data: { data: bookings, count } = {},
    isPending: isLoading,
    error: bookingsLoadError,
  } = response;

  //PREFETCHING
  const pageCount = Math.ceil(count / RECORDS_IN_A_PAGE);

  if (pageParam < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, pageParam + 1],
      queryFn: () =>
        getBookings({
          filter: filter,
          sortBy: sortBy,
          page: pageParam + 1,
        }),
    });
  }

  if (pageParam > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, pageParam - 1],
      queryFn: () =>
        getBookings({
          filter: filter,
          sortBy: sortBy,
          page: pageParam - 1,
        }),
    });
  }

  console.log(`Bookings: ${JSON.stringify(bookings)}`);

  return { bookings, count, isLoading, bookingsLoadError };
}
