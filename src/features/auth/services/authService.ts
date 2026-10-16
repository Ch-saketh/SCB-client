import { LoginCredentials, SignupCredentials } from '../types/auth.types';
import { User } from '@/types/user.types';

/**
 * Authentication service handling API communication.
 * Connects to apiClient or provides safe fallback simulation.
 */
export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // In production: return apiClient.post<{ user: User; token: string }>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    // Simulating authentication response based on client logic
    await new Promise((resolve) => setTimeout(resolve, 600));

    const role = credentials.username.toLowerCase() === 'admin' ? 'admin' : credentials.role;

    const mockUser: User = {
      id: String(Date.now()),
      username: credentials.username,
      email: `${credentials.username.toLowerCase()}@scb.com`,
      role,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    return {
      user: mockUser,
      token: 'jwt-scb-session-token-' + Math.random().toString(36).substring(2),
    };
  },

  async signup(data: SignupCredentials): Promise<{ user: User; token: string }> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const mockUser: User = {
      id: String(Date.now()),
      username: data.username,
      email: data.email,
      role: data.role,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    return {
      user: mockUser,
      token: 'jwt-scb-session-token-' + Math.random().toString(36).substring(2),
    };
  },
};
