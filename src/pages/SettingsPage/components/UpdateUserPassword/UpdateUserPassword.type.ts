export type InitialValues = {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

export enum ErrorMessages {
  OLD_PASSWORD = "Enter your old password.",
  NEW_PASSWORD = "New password must be at least 8 characters, including uppercase letters, one number and Latin letters only. Space symbol is not included. Password must be different from the previous one.",
  CONFIRM_NEW_PASSWORD = "Both passwords must match.",
}
