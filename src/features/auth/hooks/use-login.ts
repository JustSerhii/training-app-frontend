import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginPayload } from "../api/auth.types";
import { authApi } from "../api/auth.api";
import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();
   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      queryClient.clear();
      toast.success(`Welcome back, ${data.name}!`);
      router.push("/workouts");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
