export const baseValidation =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/;

export const lowerUppercaseCharsValidation = /([a-z].*[A-Z])|([A-Z].*[a-z])/;
export const specialCharsValidation = /([!,%,&,@,#,$,^,*,?,_,~])/;
