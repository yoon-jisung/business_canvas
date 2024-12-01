const SERVER_VERSION = 'v1';
const KAKAO_OAUTH_PATH = `/${SERVER_VERSION}/oauth/kakao`;

export const ENDPOINTS = {
  AUTH_KAKAO: {
    KAKAO_REDIRECT: `${KAKAO_OAUTH_PATH}/page`,
    GET_TOKEN: `${KAKAO_OAUTH_PATH}/code`,

    //NOTE: 토큰 필요
    LOGIN: `${KAKAO_OAUTH_PATH}/register`,
    UPDATE_ACCESS_TOKEN: `${KAKAO_OAUTH_PATH}/refresh`,
    PROFILE: `${KAKAO_OAUTH_PATH}/logout`
  }
} as const;
