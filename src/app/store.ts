import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import permissionSlice from '../features/permission/permissionSlice';
import paginationSlice from '../features/pagination/paginationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    general: permissionSlice,
    pagination: paginationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
