export const ROUTE_PATHS = {
  ROOT: '/',
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
  },
  DASHBOARD: {
    ROOT: '/dashboard',
    USERS: '/dashboard/users',
  },
  USER: {
    SUCCESS: '/success',
  },
} as const;
