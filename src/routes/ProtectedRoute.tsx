import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from '@/components/feedback/Loader/Loader';
import { useAuth } from '@/context/AuthContext';
import { ROUTE_PATHS } from './paths';
import { UserRole } from '@/types/common.types';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, isLoading, role } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader size="lg" text="Verifying session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.AUTH.LOGIN} state={{ from: location }} replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // If user lacks the role (e.g., standard user trying to access admin dashboard), route them to success or access denied
    return <Navigate to={ROUTE_PATHS.USER.SUCCESS} replace />;
  }

  return <>{children}</>;
};
