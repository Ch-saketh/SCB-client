export const APP_CONFIG = {
  APP_NAME: 'SCB Client Portal',
  DEFAULT_LANGUAGE: 'en',
  PAGE_SIZE_DEFAULT: 10,
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'scb_auth_token',
  AUTH_USER: 'scb_auth_user',
  THEME_MODE: 'scb_theme_mode',
} as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;
