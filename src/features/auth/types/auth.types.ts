import { UserRole } from '@/types/common.types';

export interface LoginCredentials {
  username: string;
  password: string;
  role: UserRole;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: UserRole;
}
