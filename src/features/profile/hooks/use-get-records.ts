import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../api/profile.api";

export function useGetRecords() {
  return useQuery({
    queryKey: ["profile", "records"],
    queryFn: () => profileApi.getAllRecords(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}