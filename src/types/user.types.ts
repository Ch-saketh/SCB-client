import { ID, UserRole } from './common.types';

export type { UserRole };

export interface User {
  id: ID;
  username: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}
