export enum EndpointsEnum {
  // AUTH
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

  // USERS
  USERS = "users",
  USERS_PROFILE = "users/profile/",
  USERS_SEARCH = "users/search",
  PROFILE = "users/me",
  UPDATE_PASSWORD = "users/update-password",
  FOLLOW_UNFOLLOW = "users/subscribe-unsubscribe/",
  USERS_FOLLOWING = "users/my-follow",
  USERS_FOLLOWERS = "users/my-followers",

  // BOOKS
  USERS_BOOKS = "books/books",
  TOOGLE_FAVORITE_BOOKS = "/books/toggle-favorite-status/",
  DELETE_BOOK = "books/",
  EDITE_BOOK = "books/",

  // FILES
  UPLOAD_FILES = "files/upload",
  FILES = "files/",

  // POSTS
  CREATE_POST = "posts/create",
  EDIT_POST = "posts/update/",
  DELETE_POST = "posts/delete",
  POSTS_BY_AUTHOR = "/posts/by-author",
  POSTS_BY_USER = "posts/by-user/",
  LIKED_POSTS = "/posts/posts",
  LIKED_USER_LIST = "posts/users-who-liked-post/",

  // LIKE
  POST_LIKE = "likes/like-unlike-post/",
  COMMENT_LIKE = "likes/like-unlike-comment/",

  // COMMENTS
  COMMENTS = "comments/",

  // FEEDS
  FEEDS = "feed",
}
