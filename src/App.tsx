import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import PublicHomePage from './pages/public/PublicHomePage';
import UserHomePage from './pages/user/UserHomePage';
import AdminPermissionPage from './pages/admin/AdminPermissionPage';
import AdminRolePage from './pages/admin/AdminRolePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route  path="/" element={
            <PublicHomePage />
          }
        />
        {/* admin */}
        <Route  path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute> 
          }
        />
        <Route path="/admin/permissions" element={
          <ProtectedRoute>
            <AdminPermissionPage />
          </ProtectedRoute> 
          }
        />
        <Route path="/admin/roles" element={
          <ProtectedRoute>
            <AdminRolePage />
          </ProtectedRoute> 
          }
        />
        {/* user */}
        <Route  path="/user/home" element={
          <ProtectedRoute>
            <UserHomePage />
          </ProtectedRoute> 
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
