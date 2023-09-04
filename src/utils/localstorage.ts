export const getTokenFromLC = (): string | null => {
  return localStorage.getItem("token");
};

export const getRefreshTokenFromLC = (): string | null => {
  return localStorage.getItem("refreshToken");
};
