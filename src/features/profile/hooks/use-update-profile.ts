import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../api/profile.api";
import { toast } from "sonner";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name?: string; bodyWeight?: number }) =>
      profileApi.updateProfile(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
      toast.success("Profile updated");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
