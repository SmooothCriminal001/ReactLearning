import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      console.log("Successful login");
      queryClient.setQueryData(["user"], data.user);
      toast.success("Login successful");
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });

  const { isPending: isLoggingIn, mutate: login } = response;
  console.group("Login response");
  console.dir(response);
  console.groupEnd();

  return { isLoggingIn, login };
}
