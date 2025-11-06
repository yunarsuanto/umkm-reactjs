import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { login, loginWithGoogle } from '../api/auth.api';
import { AuthResponse, AuthState, AuthTokenRole } from '../types/general/AuthTypes';
import { LoginSchema } from '../schemas/login.schema';
import { setMode } from './generalSlice';
import saveToken from '../constants/saveToken';
import { LoginWithGoogleSchema } from '../schemas/login_with_google.schema';

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginSchema,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login Gagal')
    }
  }
)

export const loginUserWithGoogle = createAsyncThunk<
  AuthResponse,
  LoginWithGoogleSchema,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginWithGoogle(credentials)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login Gagal')
    }
  }
)

export const rehydrateAuth = createAsyncThunk<AuthTokenRole, void, {rejectValue: string}>('auth/rehydrate', async (_, { dispatch, rejectWithValue }) => {
  try {
      const stored = localStorage.getItem('token');
      if (!stored) return rejectWithValue('No token found');

      const { token, expiry } = JSON.parse(stored);
      if (Date.now() > expiry) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        dispatch(setMode('auth'));
        return rejectWithValue('Token expired');
      }

      const role = localStorage.getItem('role');
      if (!role) return rejectWithValue('No Role found');

      return {token, role};
    } catch (error: any) {
      return rejectWithValue('Failed to rehydrate auth');
    }
});

const initialState: AuthState = {
  token: null,
  type: null,
  isSuperAdmin: false,
  loading: 'idle',
  error: null,
  googlePayload: {
    email: '',
    email_verified: false,
    exp: 0,
    iat: 0,
    name: '',
    given_name: '',
    family_name: '',
    sub: '',
  },
  role: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.loading = 'idle';
      state.error = null;
      localStorage.removeItem('token');
    },
    setGooglePayload: (state, action: PayloadAction<any>) => {
      state.googlePayload = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = 'succeeded';
        state.type = action.payload.data.appType;
        saveToken(action.payload.data.accessToken, 3600, action.payload.data.refreshToken, action.payload.data.role);
        state.token = action.payload.data.accessToken;
        state.role = action.payload.data.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
      .addCase(rehydrateAuth.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(rehydrateAuth.fulfilled, (state, action: PayloadAction<AuthTokenRole>) => {
        state.loading = 'succeeded';
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(rehydrateAuth.rejected, (state) => {
        state.loading = 'failed';
        state.token = null;
      });
  },
});

export const { clearToken } = authSlice.actions;
export default authSlice.reducer;
