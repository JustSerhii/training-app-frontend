import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../api/profile.api";

export function useGetProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => profileApi.getProfile(),
  });
}