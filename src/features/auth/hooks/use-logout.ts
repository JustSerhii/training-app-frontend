import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import { toast } from "sonner";

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => router.push(`/auth/login`),
    onError: (error: Error) => toast.error(error.message),
  });
}
