import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { NotFoundPage } from '@/pages/not-found/NotFoundPage';
import { SuccessPage } from '@/pages/success/SuccessPage';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTE_PATHS } from './paths';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path={ROUTE_PATHS.ROOT} element={<Navigate to={ROUTE_PATHS.AUTH.LOGIN} replace />} />

      {/* Public / Auth routes */}
      <Route path={ROUTE_PATHS.AUTH.LOGIN} element={<LoginPage />} />
      <Route path={ROUTE_PATHS.AUTH.SIGNUP} element={<SignupPage />} />

      {/* User authenticated success/landing page */}
      <Route
        path={ROUTE_PATHS.USER.SUCCESS}
        element={
          <ProtectedRoute>
            <SuccessPage />
          </ProtectedRoute>
        }
      />

      {/* Protected Admin Dashboard routes with DashboardLayout shell */}
      <Route
        path={ROUTE_PATHS.DASHBOARD.ROOT}
        element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<DashboardPage />} />
      </Route>

      {/* Fallback 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
