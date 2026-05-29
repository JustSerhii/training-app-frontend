import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import { toast } from "sonner";
import { RegisterPayload } from "../api/auth.types";

export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (data) => {
      queryClient.clear();
      toast.success(`Account created! Welcome, ${data.name}!`);
      router.push("/workouts");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
