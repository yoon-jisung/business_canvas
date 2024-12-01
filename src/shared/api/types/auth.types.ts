export type LoginDTO = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: number;
    email: string;
  };
};
export type GetTokenResponse = {
  access_token: string;
  refresh_token: string | null;
};

export type KakaoLoginResponse = {
  id: string;
  email: string;
  nickname: string;
  profile_image: string;
  channel_ids: null;
  channel_id_type: null;
  created_at: string;
  updated_at: string;
};
