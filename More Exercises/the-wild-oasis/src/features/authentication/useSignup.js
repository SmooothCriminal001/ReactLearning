import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const response = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "New Account added! Please verify the new account from the user's email address"
      );
    },
    onError: (err) => {
      toast.error(`Error while signing up: ${err.message}`);
    },
  });

  const { isPending: isSigningUp, mutate: signUp } = response;

  return { isSigningUp, signUp };
}
