import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { login } from '../../api/auth.api';
import { LoginSchema } from '../../schemas/login.schema';
import { AuthResponse, AuthState } from '../../types/general/AuthTypes';

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

const initialState: AuthState = {
  token: null,
  type: null,
  isAuthenticated: false,
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
      state.isAuthenticated = false;
      state.loading = 'idle';
      state.error = null;
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
        state.isAuthenticated = true;
        state.token = action.payload.data.access_token;
        state.type = action.payload.data.app_type;
        localStorage.setItem('token', action.payload.data.access_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearToken } = authSlice.actions;
export default authSlice.reducer;
