import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../api/profile.api";

export function useGetProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => profileApi.getProfile(),
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}