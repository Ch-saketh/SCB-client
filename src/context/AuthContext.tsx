import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { STORAGE_KEYS } from '@/config/constants';
import { User, UserRole } from '@/types/user.types';
import { storage } from '@/utils/storage';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Rehydrate session from storage on app mount
    const savedUser = storage.get<User | null>(STORAGE_KEYS.AUTH_USER, null);
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string = 'mock-jwt-token') => {
    setUser(userData);
    storage.set(STORAGE_KEYS.AUTH_USER, userData);
    storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
  };

  const logout = () => {
    setUser(null);
    storage.remove(STORAGE_KEYS.AUTH_USER);
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  };

  const role = user?.role ?? null;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
