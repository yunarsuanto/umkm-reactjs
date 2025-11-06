import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import PublicHomePage from './pages/public/PublicHomePage';
import UserHomePage from './pages/user/UserHomePage';
import AdminPermissionPage from './pages/admin/AdminPermissionPage';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { rehydrateAuth } from './features/authSlice';
import { setMode, setResponsive } from './features/generalSlice';
import AdminRolePage from './pages/admin/AdminRolePage';
import AdminUserPage from './pages/admin/AdminUserPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminCategoryLessonPage from './pages/admin/category-lesson/AdminCategoryLessonPage';
import AdminCategoryLessonCreatePage from './pages/admin/category-lesson/AdminCategoryLessonCreatePage';
import AdminCategoryLessonUpdatePage from './pages/admin/category-lesson/AdminCategoryLessonUpdatePage';
import AdminCategoryLessonDetailPage from './pages/admin/category-lesson/AdminCategoryLessonDetailPage';
import AdminCategoryLessonDetailGetLessonsPage from './pages/admin/category-lesson/AdminCategoryLessonDetailGetLessonsPage';
import AdminSubCategoryLessonCreatePage from './pages/admin/category-lesson/AdminSubCategoryLessonCreatePage';
import AdminLessonCreatePage from './pages/admin/lesson/AdminLessonCreatePage';
import AdminSubCategoryLessonUpdatePage from './pages/admin/category-lesson/AdminSubCategoryLessonUpdatePage';
import AdminLessonUpdatePage from './pages/admin/lesson/AdminLessonUpdatePage';
import AdminLessonDetailPage from './pages/admin/lesson/AdminLessonDetailPage';
import AdminLessonItemCreatePage from './pages/admin/lesson/AdminLessonItemCreatePage';
import AdminLessonItemUpdatePage from './pages/admin/lesson/AdminLessonItemUpdatePage';
import { useMediaQuery } from '@mantine/hooks';

function App() {
  const dispatch = useAppDispatch()
  const { mode } = useAppSelector((state) => state.general);
  const { token, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const isMax360 = useMediaQuery('(max-width: 360px)');
  const isMax480 = useMediaQuery('(max-width: 480px)');
  const isMax768 = useMediaQuery('(max-width: 768px)');
  const isMax992 = useMediaQuery('(max-width: 992px)');
  const isMax1199 = useMediaQuery('(max-width: 1199px)');
  const isMin1200 = useMediaQuery('(min-width: 1200px)');

  const isExtraSmall = isMax360;
  const isSmall = isMax480 && !isMax360;
  const isMedium = isMax768 && !isMax480;
  const isLarge = isMax992 && !isMax768;
  const isDesktop = isMax1199 && !isMax992;
  const isExtraLarge = isMin1200;

  useEffect(() => {
    if (loading === 'pending') return;
    if (!token && mode !== 'auth'){
        dispatch(setMode('public'))
      navigate('/');
    }
  }, [mode, token, loading, dispatch, navigate]);

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);

  const handleSetMode = useCallback(() => {
    dispatch(setMode('auth'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setResponsive({ isExtraSmall, isSmall, isMedium, isLarge, isDesktop, isExtraLarge }));
  }, [isExtraSmall, isSmall, isMedium, isLarge, isDesktop, isExtraLarge, dispatch]);
  return (
    <Routes>
      {mode === 'admin' ?  (
        <>
          <Route path="/admin" element={<AdminDashboardPage />}/>
          <Route path="/admin/permissions" element={<AdminPermissionPage />}/>
          <Route path="/admin/roles" element={<AdminRolePage />}/>
          <Route path="/admin/users" element={<AdminUserPage />}/>
          <Route path="/admin/category-lessons" element={<AdminCategoryLessonPage />}/>
          <Route path="/admin/category-lessons/create" element={<AdminCategoryLessonCreatePage />}/>
          <Route path="/admin/category-lessons/edit/:id" element={<AdminCategoryLessonUpdatePage />}/>
          <Route path="/admin/category-lessons/detail/:parent_id" element={<AdminCategoryLessonDetailPage />}/>
          <Route path="/admin/category-lessons/detail/:parent_id/sub-category/create" element={<AdminSubCategoryLessonCreatePage />}/>
          <Route path="/admin/category-lessons/detail/:parent_id/sub-category/edit/:child_id" element={<AdminSubCategoryLessonUpdatePage />}/>
          <Route path="/admin/category-lessons/detail/:parent_id/sub-category/:child_id" element={<AdminCategoryLessonDetailGetLessonsPage />}/>
          <Route path="/admin/category-lessons/detail/:parent_id/sub-category/:child_id/create" element={<AdminLessonCreatePage />}/>
          <Route path="/admin/category-lessons/detail/:parent_id/sub-category/:child_id/detail/:lesson_id" element={<AdminLessonDetailPage />}/>
          <Route path="/admin/category-lessons/detail/:parent_id/sub-category/:child_id/edit/:lesson_id" element={<AdminLessonUpdatePage />}/>
          <Route path="/admin/category-lessons/detail/:parent_id/sub-category/:child_id/edit/:lesson_id/lesson-item/create" element={<AdminLessonItemCreatePage />}/>
          <Route path="/admin/category-lessons/detail/:parent_id/sub-category/:child_id/edit/:lesson_id/lesson-item/edit/:lesson_item_id" element={<AdminLessonItemUpdatePage />}/>
          
        </>
      ) : mode === 'auth' ? (
        <>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
        </>
      ) : mode === 'user' ? (
        <Route path="/user" element={<UserHomePage setMode={handleSetMode} />}/>
      ) : mode === 'public' && (
        <Route path="/" element={<PublicHomePage setMode={handleSetMode} />}/>
      )}
    </Routes>
  );
}

export default App;
