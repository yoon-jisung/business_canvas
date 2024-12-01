import axios, { type AxiosInstance } from 'axios';

import { API_CONFIG } from '../config/instance';
import { setupAuthInterceptor } from '../interceptors/auth.interceptor';
import { setupErrorInterceptor } from '../interceptors/error.interceptor';

export const baseAPI = axios.create(API_CONFIG);

setupAuthInterceptor(baseAPI);
setupErrorInterceptor(baseAPI);

export const createAPI = (config = {}): AxiosInstance => {
  const api = axios.create({
    ...API_CONFIG,
    ...config
  });

  setupAuthInterceptor(api);
  setupErrorInterceptor(api);
  return api;
};
