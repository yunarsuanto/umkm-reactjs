import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import permissionSlice from '../features/permissionSlice';
import roleSlice from '../features/roleSlice';
import userSlice from '../features/userSlice';
import rolePermissionSlice from '../features/rolePermissionSlice';
import userRoleSlice from '../features/userRoleSlice';
import categoryLessonSlice from '../features/categoryLessonSlice';
import lessonSlice from '../features/lessonSlice';
import lessonItemSlice from '../features/lessonItemSlice';
import paginationSlice from '../features/paginationSlice';
import generalSlice from '../features/generalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    general: generalSlice,
    permission: permissionSlice,
    role: roleSlice,
    user: userSlice,
    rolePermission: rolePermissionSlice,
    userRole: userRoleSlice,
    categoryLesson: categoryLessonSlice,
    lesson: lessonSlice,
    lessonItem: lessonItemSlice,
    pagination: paginationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
