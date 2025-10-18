import { Meta } from "../Meta";

export interface AuthState {
  token: string | null;
  type: string | null;
  isSuperAdmin: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

export interface AuthResponse {
  meta: Meta
  data: AuthDataResponse
}

export interface AuthDataResponse {
    name: string
    access_token: string
    app_type: string
    expiry_time: string
    refresh_token: string
    username: string
    admin_role_name: string
}
