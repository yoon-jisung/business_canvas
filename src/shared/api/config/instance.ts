import { ENV } from '@/shared/config';

export const API_CONFIG = {
  baseURL: ENV.API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
} as const;
