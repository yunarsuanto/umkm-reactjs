import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import permissionSlice from '../features/permission/permissionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    general: permissionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
