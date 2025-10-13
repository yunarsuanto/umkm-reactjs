import { Navigate } from 'react-router-dom';
// import { useAppSelector } from '../../app/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const { isAuthenticated } = useAppSelector((state) => state.auth);
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
