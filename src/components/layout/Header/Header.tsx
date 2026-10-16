import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/common/Badge/Badge';
import { Button } from '@/components/common/Button/Button';
import { ROUTE_PATHS } from '@/routes/paths';
import './Header.css';

export const Header: React.FC = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTE_PATHS.AUTH.LOGIN);
  };

  return (
    <header className="app-header">
      <div className="brand-section">
        <span role="img" aria-label="bank">🏛️</span>
        <span>SCB Client</span>
      </div>

      <div className="header-actions">
        {user ? (
          <div className="user-profile-badge">
            <span className="font-semibold">{user.username}</span>
            <Badge variant={role === 'admin' ? 'danger' : 'info'}>
              {role || 'user'}
            </Badge>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(ROUTE_PATHS.AUTH.LOGIN)}
            >
              Log In
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(ROUTE_PATHS.AUTH.SIGNUP)}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
