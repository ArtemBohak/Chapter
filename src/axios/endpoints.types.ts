export enum BaseURLEnum {
  GOOGLE_API = "https://www.googleapis.com/oauth2/v4",
  API = "https://obscure-island-84086-0710166a71eb.herokuapp.com/api/v1/",
}

export enum EndpointsEnum {
  USERS = "users/",
  UPLOAD_FILES = "files/upload",
  FILES = "files/",
  LOGIN = "auth/email/login",
  ADMIN_LOGIN = "auth/admin/email/login",
  REGISTRATION = "auth/email/register",
  CONFIRM = "auth/email/confirm",
  FORGOT_PASSWORD = "auth/forgot/password",
  RESET_PASSWORD = "auth/reset/password",
  PROFILE = "auth/me",
  REFRESH = "auth/refresh",
  LOGOUT = "auth/logout",
  FACEBOOK_LOGIN = "auth/facebook/login",
  GOOGLE_LOGIN = "auth/google/login",
  TWITTER_LOGIN = "auth/twitter/login",
}
