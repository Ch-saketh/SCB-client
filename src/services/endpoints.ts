export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  DASHBOARD: {
    METRICS: '/dashboard/metrics',
    ACTIVITY: '/dashboard/activity',
  },
  USERS: {
    LIST: '/users',
    DETAIL: (id: string | number) => `/users/${id}`,
  },
} as const;
