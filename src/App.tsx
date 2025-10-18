import { BrowserRouter, Routes, Route, useRoutes, useNavigate, useNavigation } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import PublicHomePage from './pages/public/PublicHomePage';
import UserHomePage from './pages/user/UserHomePage';
import AdminPermissionPage from './pages/admin/AdminPermissionPage';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { rehydrateAuth } from './features/auth/authSlice';
import { setMode } from './features/generalSlice';

function App() {
  const dispatch = useAppDispatch()
  const { mode } = useAppSelector((state) => state.general);
  const { token, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading === 'pending') return;
    if (!token){
      dispatch(setMode('public'))
      navigate('/');
    }
  }, [token, loading]);

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);

  const handleSetMode = useCallback(() => {
    dispatch(setMode('auth'));
  }, [dispatch]);

  // useEffect(() => {
  //   console.log('----- mode')
  //   console.log(mode)
  //   console.log('----- mode')
  //   switch (mode) {
  //     case 'admin':
  //       navigate('/admin');
  //       break;
  //     case 'auth':
  //       navigate('/login');
  //       break;
  //     case 'user':
  //       navigate('/user');
  //       break;
  //     case 'public':
  //       navigate('/');
  //       break;
  //   }
  // }, [mode, navigate]);

  return (
    <Routes>
      {mode === 'admin' ?  (
        <>
          <Route path="/admin" element={<AdminDashboardPage />}/>
          <Route path="/admin/permissions" element={<AdminPermissionPage />}/>
        </>
      ) : mode === 'auth' ? (
        <Route path="/login" element={<LoginPage />}/>
      ) : mode === 'user' ? (
        <Route path="/user" element={<UserHomePage />}/>
      ) : mode === 'public' && (
        <Route path="/" element={<PublicHomePage setMode={handleSetMode} />}/>
      )}
    </Routes>
  );
}

export default App;
