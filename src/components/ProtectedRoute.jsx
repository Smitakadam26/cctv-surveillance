import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { user } = useAuth();

  // If user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
