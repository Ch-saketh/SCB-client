import React from 'react';
import { SignupForm } from '@/features/auth/components/SignupForm';
import { AuthLayout } from '@/layouts/AuthLayout';

export const SignupPage: React.FC = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Register to access the SCB Client portal"
    >
      <SignupForm />
    </AuthLayout>
  );
};
