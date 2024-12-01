import { baseAPI } from '../base/base.api';
import { ENDPOINTS } from '../config/endpoints';
import { handleAPIError } from '../lib/error';
import type { APIResponse } from '../types/api.types';
import type { GetTokenResponse, KakaoLoginResponse } from '../types/auth.types';

export const authService = {
  /**
   * 카카오 로그인 페이지로 리다이렉트합니다.
   * @returns redirect url
   */
  async redirectKakaoLogin(): Promise<APIResponse<string>> {
    try {
      const response = await baseAPI.get(ENDPOINTS.AUTH_KAKAO.KAKAO_REDIRECT);
      return response.data;
    } catch (error) {
      return handleAPIError(error);
    }
  },
  /**
   * @param code 카카오 로그인 페이지에서 받은 code
   * @returns {string} access_token,refresh_token
   */
  async getKakaoToken(code: string): Promise<APIResponse<GetTokenResponse>> {
    try {
      const params = { code };
      const response = await baseAPI.get(ENDPOINTS.AUTH_KAKAO.GET_TOKEN, { params });
      return response.data;
    } catch (error) {
      return handleAPIError(error);
    }
  },

  /**
   * 토큰으로 카카오 로그인, DB에 없으면 회원가입
   * @returns {KakaoLoginResponse} 카카오 프로필 정보
   */
  async loginKakao(token?: string): Promise<APIResponse<KakaoLoginResponse>> {
    try {
      if (!token) {
        const response = await baseAPI.get(ENDPOINTS.AUTH_KAKAO.LOGIN);
        return response.data;
      }
      const response = await baseAPI.get(ENDPOINTS.AUTH_KAKAO.LOGIN, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return handleAPIError(error);
    }
  },

  /**
   * access_token 갱신
   * @param code 카카오 로그인 페이지에서 받은 code
   * @returns {string} access_token,refresh_token
   */
  async updateAccessToken(refreshToken: string): Promise<APIResponse<GetTokenResponse>> {
    try {
      const response = await baseAPI.get(ENDPOINTS.AUTH_KAKAO.UPDATE_ACCESS_TOKEN, {
        headers: {
          authorization: `Bearer ${refreshToken}`
        }
      });
      return response.data;
    } catch (error) {
      return handleAPIError(error);
    }
  },

  /**
   * 카카오 프로필 정보 가져오기
   * @returns {KakaoLoginResponse} 카카오 프로필 정보
   */
  async getProfile(): Promise<APIResponse<KakaoLoginResponse>> {
    try {
      const response = await baseAPI.get(ENDPOINTS.AUTH_KAKAO.PROFILE);
      return response.data;
    } catch (error) {
      return handleAPIError(error);
    }
  }
};
