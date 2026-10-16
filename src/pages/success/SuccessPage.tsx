import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import { Card } from '@/components/common/Card/Card';
import { useAuth } from '@/context/AuthContext';
import { ROUTE_PATHS } from '@/routes/paths';

export const SuccessPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTE_PATHS.AUTH.LOGIN);
  };

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
      <Card
        style={{
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-3)' }}>🎉</div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-text-main)' }}>
          Login Successful!
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--spacing-2)' }}>
          Welcome to the SCB Client System,{' '}
          <b>{user?.username || 'User'}</b>!
        </p>

        <div
          style={{
            margin: 'var(--spacing-6) 0',
            padding: 'var(--spacing-4)',
            backgroundColor: 'var(--color-bg-muted)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'left',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          <p><b>Role:</b> {user?.role || 'User'}</p>
          <p><b>Status:</b> Active Session</p>
          <p><b>Client Session ID:</b> {user?.id || 'Active'}</p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--spacing-3)', justifyContent: 'center' }}>
          <Button variant="primary" onClick={() => navigate(ROUTE_PATHS.DASHBOARD.ROOT)}>
            Go to Dashboard
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Card>
    </div>
  );
};
