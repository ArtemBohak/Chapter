export enum EndpointsEnum {
  LOGIN = "auth/email/login",
  ADMIN_LOGIN = "auth/admin/email/login",
  REGISTRATION = "auth/email/register",
  REGISTRATION_FINALLY = "auth/email/register/finaly",
  CONFIRM = "auth/email/confirm",
  FORGOT_PASSWORD = "auth/forgot/password",
  RESET_PASSWORD = "auth/reset/password",
  REFRESH = "auth/refresh",
  LOGOUT = "auth/logout",
  FACEBOOK_LOGIN = "auth/facebook/login",
  GOOGLE_LOGIN = "auth/google/login",
  TWITTER_LOGIN = "auth/twitter/login",
  GOOGLE_RESTORE = "auth/restoring-user-by-google",
  EMAIL_RESTORE = "auth/restoring-user",
  CONFIRM_EMAIL_RESTORE = "auth/confirm-restoring-user",
  NICKNAME_VALIDATION = "auth/nickname-validation",
  RESENT_OTP = "auth/refresh-unique-token",
  USERS = "users",
  USERS_PROFILE = "users/profile/",
  USERS_SEARCH = "users/search",
  PROFILE = "users/me",
  UPDATE_PASSWORD = "users/update-password",
  UPLOAD_FILES = "files/upload",
  FILES = "files/",
  CREATE_POST = "posts/create",
  USERS_BOOKS = "users/books",
  BOOK_FAVORITE_STATUS = "users/toggle-favorite-status",
}
