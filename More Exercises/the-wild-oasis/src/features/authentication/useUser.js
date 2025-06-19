import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUser() {
  const response = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const { data: user, isPending: isFetchingUser, error } = response;
  console.log(response);

  if (error) {
    toast.error(`Error while fetching user: ${error}`);
    return;
  }

  return {
    user,
    isFetchingUser,
    isAuthenticated: user?.role === "authenticated",
  };
}
