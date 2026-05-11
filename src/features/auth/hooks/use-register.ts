import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import { toast } from "sonner";
import { RegisterPayload } from "../api/auth.types";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (data) => {
      toast.success(`Account created! Welcome, ${data.name}!`);
      // TODO page after auth redirection
      router.push("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
