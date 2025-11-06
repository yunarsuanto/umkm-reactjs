import { Meta } from "../Meta";

export interface AuthState {
  token: string | null;
  type: string | null;
  isSuperAdmin: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  googlePayload: GooglePayload
  role: string
}

export interface AuthResponse {
  meta: Meta
  data: AuthDataResponse
}

export interface AuthDataResponse {
  accessToken: string
  refreshToken: string
  expiredAt: string
  permissions: string
  role: string
  appType: string
}

export interface GooglePayload {
  email: string
  email_verified: boolean
  exp: number
  iat: number
  name: string
  given_name: string
  family_name: string
  sub: string
  picture?: string
  aud?: string
  azp?: string
  iss?: string
  jti?: string
  nbf?: number
}

export interface AuthTokenRole {
  token: string
  role: string
}