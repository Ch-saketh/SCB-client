import React from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { AuthLayout } from '@/layouts/AuthLayout';

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your SCB Client account"
    >
      <LoginForm />
    </AuthLayout>
  );
};
