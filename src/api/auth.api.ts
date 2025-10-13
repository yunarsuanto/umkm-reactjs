import apiClient from "./client";
import { LoginSchema } from "../schemas/login.schema";
import { AuthResponse } from "../types/general/AuthTypes";

// Fungsi untuk login user
export const login = async (credentials: LoginSchema): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    'general.general-auth-hendler/login', 
    credentials
  );
  return response.data;
};
