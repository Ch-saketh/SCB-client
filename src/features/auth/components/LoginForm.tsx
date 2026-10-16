import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Alert } from '@/components/feedback/Alert/Alert';
import { useAuth } from '@/context/AuthContext';
import { ROUTE_PATHS } from '@/routes/paths';
import { UserRole } from '@/types/common.types';
import { authService } from '../services/authService';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Please fill in both username and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      const { user, token } = await authService.login({ username, password, role });
      login(user, token);

      if (user.role === 'admin' || username.trim().toLowerCase() === 'admin') {
        navigate(ROUTE_PATHS.DASHBOARD.ROOT);
      } else {
        navigate(ROUTE_PATHS.USER.SUCCESS);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setRole('user');
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Input
        label="Username"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <fieldset
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-3)',
          textAlign: 'left',
        }}
      >
        <legend style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-muted)' }}>
          Role Selection
        </legend>
        <div style={{ display: 'flex', gap: 'var(--spacing-6)', marginTop: 'var(--spacing-1)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', cursor: 'pointer' }}>
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
            />
            <span style={{ fontSize: 'var(--font-size-sm)' }}>User</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', cursor: 'pointer' }}>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />
            <span style={{ fontSize: 'var(--font-size-sm)' }}>Admin</span>
          </label>
        </div>
      </fieldset>

      <div style={{ display: 'flex', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-2)' }}>
        <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
          Log In
        </Button>
        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)' }}>
        <span style={{ color: 'var(--color-text-muted)' }}>Don't have an account? </span>
        <Link to={ROUTE_PATHS.AUTH.SIGNUP} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
          Sign Up
        </Link>
      </div>

      <div
        style={{
          backgroundColor: 'var(--color-bg-muted)',
          padding: 'var(--spacing-2)',
          borderRadius: 'var(--radius-sm)',
          textAlign: 'center',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-muted)',
        }}
      >
        💡 <i>Tip: Select "Admin" or enter username <b>admin</b> to open the Admin Dashboard.</i>
      </div>
    </form>
  );
};
