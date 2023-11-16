export const nickNameCharsRegex = /^@[a-zA-Z]+$/;

export const simpleStringRegex =
  /^(?:[a-zA-ZґҐіІєЄщЩ\u0400-\u04FF]+(?:['`ʼ\s]*[a-zA-Z\u0400-\u04FF]+)*)+$/;

export const isNickNameCheckingPattern =
  /^@[a-zA-Z'`]+[!@#$%^&*()_+{}|[\]\\:;"'<>,.?/]*$/;

export const replaceSymbolsPattern = /[!@#$%^&*()_+{}|[\]\\:;"'<>,.?/]+$/g;

export const replaceLettersPattern = /^@[a-zA-Z'`]+/g;
