import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import PublicHomePage from './pages/public/PublicHomePage';
import UserHomePage from './pages/user/UserHomePage';
import AdminPermissionPage from './pages/admin/AdminPermissionPage';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setMode } from './features/generalSlice';
import PWAInstallPrompt from './components/PWAInstallPrompt';
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
import PlayPage from './pages/public/PlayPage';
import { useDeviceMode } from './constants/dimension';
import AdminLessonGroupCreatePage from './pages/admin/lesson/AdminLessonGroupCreatePage';
import AdminLessonGroupAssignItemPage from './pages/admin/lesson/AdminLessonGroupAssignItemPage';
import getCachedMediaUrl from './constants/get_cache_media';
import PlayDetailPlay from './pages/public/PlayDetailPage';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token, loading } = useAppSelector((s) => s.auth);
  const { mode } = useAppSelector((s) => s.general);
  // const { device, orientation } = useDeviceMode();

  // useEffect(() => {
  //   dispatch(rehydrateAuth());
  // }, [dispatch]);

  // useEffect(() => {
  //   const path = location.pathname;

  //   if (path.startsWith("/admin")) {
  //     dispatch(setMode("admin"));
  //   } else if (["/login", "/register"].includes(path)) {
  //     dispatch(setMode("auth"));
  //   } else if (path.startsWith("/user")) {
  //     dispatch(setMode("user"));
  //   } else if (["/", "/play"].includes(path)) {
  //     dispatch(setMode("public"));
  //   } else {
  //     dispatch(setMode("public"));
  //   }
  // }, [location.pathname, dispatch]);

  // useEffect(() => {
  //   if (loading === "pending") return;
  //   if (location.pathname === "/play") return;
  //   if (!token && mode !== "auth") {
  //     navigate("/");
  //     return;
  //   }
  // }, [loading, token, mode, location.pathname, navigate]);

  const handleSetMode = useCallback(() => {
    dispatch(setMode("auth"));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    console.log(location.pathname)
  }, [location.pathname]);

  return (
    <>
      <Routes>
        {/* {mode === "admin" && ( */}
        <>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/permissions" element={<AdminPermissionPage />} />
          <Route path="/admin/roles" element={<AdminRolePage />} />
          <Route path="/admin/users" element={<AdminUserPage />} />

          <Route path="/admin/category-lessons" element={<AdminCategoryLessonPage />} />
          <Route path="/admin/category-lessons/create" element={<AdminCategoryLessonCreatePage />} />
          <Route path="/admin/category-lessons/edit/:id" element={<AdminCategoryLessonUpdatePage />} />

          <Route path="/admin/category-lessons/detail/:category_lesson_id" element={<AdminCategoryLessonDetailPage />} />

          <Route path="/admin/category-lessons/detail/:category_lesson_id/lesson/create" element={<AdminLessonCreatePage />} />
          <Route path="/admin/category-lessons/detail/:category_lesson_id/lesson/edit/:lesson_id" element={<AdminLessonUpdatePage />} />
          <Route path="/admin/category-lessons/detail/:category_lesson_id/lesson/detail/:lesson_id" element={<AdminLessonDetailPage />} />

          <Route path="/admin/category-lessons/detail/:category_lesson_id/lesson/detail/:lesson_id/item/create" element={<AdminLessonItemCreatePage />} />
          <Route path="/admin/category-lessons/detail/:category_lesson_id/lesson/detail/:lesson_id/group/create" element={<AdminLessonGroupCreatePage />} />
          <Route path="/admin/category-lessons/detail/:category_lesson_id/lesson/detail/:lesson_id/item/edit/:lesson_item_id" element={<AdminLessonItemUpdatePage />} />
          <Route path="/admin/category-lessons/detail/:category_lesson_id/lesson/detail/:lesson_id/item/assign-group/:lesson_item_id" element={<AdminLessonGroupAssignItemPage />} />
        </>
        {/* )} */}

        {/* {mode === "auth" && ( */}
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </>
        {/* )} */}

        {/* {mode === "user" && ( */}
        <Route path="/user" element={<UserHomePage setMode={handleSetMode} />} />
        {/* )} */}

        {/* {mode === "public" && ( */}
        <>
          <Route path="/" element={<PublicHomePage setMode={handleSetMode} />} />
          <Route path="/play" element={<PlayPage setMode={handleSetMode} />} />
          <Route path="/play/:category_lesson_id" element={<PlayDetailPlay setMode={handleSetMode} />} />
        </>
        {/* )} */}
      </Routes>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </>
  );
}


export default App;
