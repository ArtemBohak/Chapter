export enum apiUiMessage {
  ACCOUNT_DELETED = "Account was deleted. Do you want to restore?",
  EMAIL_IN_USE = "Email address is already in use.",
  INVALID_HASH = "Invalid sign up code.",
  INVALID_RECOVERY_CODE = "Incorrect code",
  WRONG_PASSWORD = "Try again!",
  ERROR_MESSAGE = "Something wrong! Reload or try again later.",
}

export enum apiErrorMessage {
  WRONG_HASH = "Wrong hash",
  ACCOUNT_DELETED = "Account was deleted. Do you want to restore?",
  UPDATE_PASSWORD = "Incorrect old password!",
  NICKNAME_IN_USE = "Nickname is aviable to used",
  CANCELED = "ERR_CANCELED",
}

export enum apiErrorStatus {
  FORBIDDEN = 403,
  NOTFOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  BAD_REQUEST = 400,
  TOO_MANY_REQUEST = 429,
}

export enum apiSuccessStatus {
  SUCCESS = 200,
}
