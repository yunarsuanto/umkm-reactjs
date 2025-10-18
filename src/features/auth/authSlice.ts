import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { login } from '../../api/auth.api';
import { LoginSchema } from '../../schemas/login.schema';
import { AuthResponse, AuthState } from '../../types/general/AuthTypes';
import { setMode } from '../generalSlice';
import saveToken from '../../constants/saveToken';

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

export const rehydrateAuth = createAsyncThunk('auth/rehydrate', async (_, { dispatch, rejectWithValue }) => {
  try {
      const stored = localStorage.getItem('token');
      if (!stored) return rejectWithValue('No token found');

      const { token, expiry } = JSON.parse(stored);
      if (Date.now() > expiry) {
        localStorage.removeItem('token');
        dispatch(setMode('auth'));
        return rejectWithValue('Token expired');
      }
      return token;
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
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = null;
      state.loading = 'idle';
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = 'succeeded';
        state.type = action.payload.data.app_type;
        saveToken(action.payload.data.access_token, 3600);
        state.token = action.payload.data.access_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
      .addCase(rehydrateAuth.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(rehydrateAuth.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = 'succeeded';
        state.token = action.payload;
      })
      .addCase(rehydrateAuth.rejected, (state) => {
        state.loading = 'failed';
        state.token = null;
      });
  },
});

export const { clearToken } = authSlice.actions;
export default authSlice.reducer;
