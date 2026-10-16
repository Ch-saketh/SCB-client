/**
 * Centralized, type-safe environment configuration.
 * Avoids direct process.env or import.meta.env calls throughout the app.
 */
export const ENV = {
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'SCB Client Portal',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
} as const;
