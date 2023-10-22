export enum apiErrorMsg {
  ACCOUNT_DELETED = "Account was deleted. Do you want to restore?",
  EMAIL_IN_USE = "Email address is already in use.",
  INVALID_HASH = "Invalid sign up code.",
}

export enum apiErrorStatus {
  FORBIDDEN = 403,
  NOTFOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
}
