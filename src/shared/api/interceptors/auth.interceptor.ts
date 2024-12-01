import { type AxiosInstance } from 'axios';

// import { authService } from '../services/auth.service';

export const setupAuthInterceptor = (api: AxiosInstance): void => {
  api.interceptors.request.use((config) => {
    /* 예시
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
    */
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.error('로그인이 필요합니다.');
      return Promise.reject(error);
    }
  );
};
