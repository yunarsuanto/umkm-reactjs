import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import AdminLessonCreatePage from './pages/admin/lesson/AdminLessonCreatePage';
import AdminLessonUpdatePage from './pages/admin/lesson/AdminLessonUpdatePage';
import AdminLessonDetailPage from './pages/admin/lesson/AdminLessonDetailPage';
import AdminLessonItemCreatePage from './pages/admin/lesson/AdminLessonItemCreatePage';
import AdminLessonItemUpdatePage from './pages/admin/lesson/AdminLessonItemUpdatePage';
import { useMediaQuery } from '@mantine/hooks';
import PlayPage from './pages/public/PlayPage';

function App() {
  const dispatch = useAppDispatch()
  const { mode } = useAppSelector((state) => state.general);
  const { token = null, loading = 'idle' } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

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
    if(location.pathname === '/play') {
      return
    }else if (!token && mode !== 'auth'){
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

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/admin")) {
      dispatch(setMode("admin"));
    } else if (["/login", "/register"].includes(path)) {
      dispatch(setMode("auth"));
    } else if (path.startsWith("/user")) {
      dispatch(setMode("user"));
    } else if (["/", "/play"].includes(path)) {
      dispatch(setMode("public"));
    } else {
      console.warn("⚠️ No matching route for:", path);
      dispatch(setMode("public"));
    }
  }, [location.pathname]);
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
          <Route path="/admin/category-lessons/detail/:category_lesson_id" element={<AdminCategoryLessonDetailPage />}/>
          <Route path="/admin/category-lessons/detail/:category_lesson_id/lesson/create" element={<AdminLessonCreatePage />}/>
          <Route path="/admin/category-lessons/detail/:category_lesson_id/lesson/edit/:lesson_id" element={<AdminLessonUpdatePage />}/>
          <Route path="/admin/category-lessons/detail/:category_lesson_id/lesson/detail/:lesson_id" element={<AdminLessonDetailPage />}/>
          <Route path="/admin/category-lessons/detail/:category_lesson_id/lesson/detail/:lesson_id/item/create" element={<AdminLessonItemCreatePage />}/>
          <Route path="/admin/category-lessons/detail/:category_lesson_id/lesson/detail/:lesson_id/item/edit/:lesson_item_id" element={<AdminLessonItemUpdatePage />}/>
        </>
      ) : mode === 'auth' ? (
        <>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
        </>
      ) : mode === 'user' ? (
        <Route path="/user" element={<UserHomePage setMode={handleSetMode} />}/>
      ) : mode === 'public' && (
        <>
          <Route path="/" element={<PublicHomePage setMode={handleSetMode} />}/>
          <Route path="/play" element={<PlayPage setMode={handleSetMode} />}/>
        </>
      )}
    </Routes>
  );
}

export default App;
