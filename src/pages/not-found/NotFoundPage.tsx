import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import { Card } from '@/components/common/Card/Card';
import { ROUTE_PATHS } from '@/routes/paths';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg-app)',
        padding: 'var(--spacing-4)',
      }}
    >
      <Card style={{ maxWidth: '440px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--color-primary)' }}>404</h1>
        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600 }}>Page Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', margin: 'var(--spacing-4) 0' }}>
          The requested page could not be located.
        </p>
        <Button variant="primary" onClick={() => navigate(ROUTE_PATHS.AUTH.LOGIN)}>
          Return to Login
        </Button>
      </Card>
    </div>
  );
};
