export enum apiUiMessage {
  ACCOUNT_DELETED = "Account was deleted. Do you want to restore?",
  EMAIL_IN_USE = "Email address is already in use.",
  INVALID_HASH = "Invalid OTP code.",
  INVALID_RECOVERY_CODE = "Incorrect code",
  WRONG_PASSWORD = "Try again!",
  ERROR_MESSAGE = "Something wrong! Reload or try again later.",
  INSPIRED_HASH = "OTP code has expired",
  NICKNAME_IN_USE = "Username is taken.",
  NOT_REGISTERED = "This user is not registered",
  REGISTRATION_UNCOMPLETED = "This user has not completed the registration",
  EMAIL_UNCONFIRMED = "This user has not confirmed his email",
}

export enum apiErrorMessage {
  WRONG_HASH = "Wrong hash",
  ACCOUNT_DELETED = "Account was deleted. Do you want to restore?",
  UPDATE_PASSWORD = "Incorrect old password!",
  NICKNAME_IN_USE = "User with this nickname already exists.",
  CANCELED = "ERR_CANCELED",
  REGISTRATION_UNCOMPLETED = "You have not completed the registration",
  EMAIL_UNCONFIRMED = "Email status is Inactive",
  UNCONFIRMED_EMAIL = "Email not confirmed",
  UNCOMPLETED_REGISTRATION = "User registrtion is not completed",
  EMAIL_NOT_EXISTS = "emailNotExists",
  REQUESTS_IS_EXPIRED = "You can request a password reset maximum 3 times per day.",
  USERS_NOT_FOUND = "Users not found",
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
