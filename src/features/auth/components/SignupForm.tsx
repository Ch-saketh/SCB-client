import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Alert } from '@/components/feedback/Alert/Alert';
import { useAuth } from '@/context/AuthContext';
import { ROUTE_PATHS } from '@/routes/paths';
import { UserRole } from '@/types/common.types';
import { isValidEmail } from '@/utils/validators';
import { authService } from '../services/authService';

export const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setIsSubmitting(true);
      const { user, token } = await authService.signup({
        username,
        email,
        password,
        role,
      });

      login(user, token);

      if (user.role === 'admin') {
        navigate(ROUTE_PATHS.DASHBOARD.ROOT);
      } else {
        navigate(ROUTE_PATHS.USER.SUCCESS);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('user');
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Input
        label="Username"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Re-enter password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
          Assigned Role
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
          Register
        </Button>
        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)' }}>
        <span style={{ color: 'var(--color-text-muted)' }}>Already have an account? </span>
        <Link to={ROUTE_PATHS.AUTH.LOGIN} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
          Log In
        </Link>
      </div>
    </form>
  );
};
