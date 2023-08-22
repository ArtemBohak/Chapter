import { IEndpoints } from "./endpoints.types";

const endpoints: IEndpoints = {
  USERS: `/api/v1/users/`,
  UPLOAD_FILES: `/api/v1/files/upload`,
  FILES: `/api/v1/files/`,
  LOGIN: `/api/v1/auth/email/login`,
  ADMIN_LOGIN: `/api/v1/auth/admin/email/login`,
  REGISTRATION: `/api/v1/auth/email/register`,
  CONFIRM: `/api/v1/auth/email/confirm`,
  FORGOT_PASSWORD: `/api/v1/auth/forgot/password`,
  RESET_PASSWORD: `/api/v1/auth/reset/password`,
  PROFILE: `/api/v1/auth/me`,
  REFRESH: `/api/v1/auth/refresh`,
  LOGOUT: `/api/v1/auth/logout`,
  FACEBOOK_LOGIN: `/api/v1/auth/facebook/login`,
  GOOGLE_LOGIN: `/api/v1/auth/google/login`,
  TWITTER_LOGIN: `/api/v1/auth/twitter/login`,
};

export default endpoints;
