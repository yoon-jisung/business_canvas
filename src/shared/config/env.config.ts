export const ENV = {
  MODE: process.env.NODE_ENV ?? 'development',
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL
} as const;
