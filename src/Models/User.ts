export type UserProfileToken = {
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}

export type UserProfile = {
  email: string;
  username: string;
};

export type RefreshToken = {
  refreshToken: string;
}