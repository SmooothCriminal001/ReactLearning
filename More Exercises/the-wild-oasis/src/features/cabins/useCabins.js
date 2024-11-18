import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const response = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const {
    data: cabinData,
    isPending: isFetchingCabins,
    error: cabinsLoadError,
  } = response;

  return { cabinData, isFetchingCabins, cabinsLoadError };
}
