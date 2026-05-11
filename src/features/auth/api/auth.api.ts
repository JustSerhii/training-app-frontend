import { apiClient, setAccessToken } from "@/shared/api/client";
import { AuthResponse, LoginPayload, RegisterPayload } from "./auth.types";

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const data = await apiClient.post<AuthResponse>("/auth/login", payload);
    setAccessToken(data.accessToken);
    return data;
  },

  register: async(payload: RegisterPayload): Promise<AuthResponse> => {
    const data = await apiClient.post<AuthResponse>("/auth/register", payload);
    setAccessToken(data.accessToken);
    return data;
  },

  logout: async(): Promise<void> => {
    await apiClient.post<void>("/auth/logout");
    setAccessToken(null);
  }
}