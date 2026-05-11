import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginPayload } from "../api/auth.types";
import { authApi } from "../api/auth.api";
import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      toast.success(`Welcome back, ${data.name}!`);
      // TODO page after auth redirection
      router.push("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
