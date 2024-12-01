import { AxiosInstance } from 'axios';

export const setupErrorInterceptor = (api: AxiosInstance): void => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 404) {
        //TODO: redirect to 404 page
      }
      if (error.response?.status === 500) {
        //TODO: redirect to 500 page
      }
      return Promise.reject(error);
    }
  );
};
