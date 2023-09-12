export const getTokenFromLC = (): string | null => {
  return localStorage.getItem("token");
};
