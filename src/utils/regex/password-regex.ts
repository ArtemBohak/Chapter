export const baseValidation =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const lowerUppercaseCharsValidation = /([a-z].*[A-Z])|([A-Z].*[a-z])/;
export const specialCharsValidation = /([!,%,&,@,#,$,^,*,?,_,~])/;