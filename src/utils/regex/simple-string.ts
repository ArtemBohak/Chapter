export const nickNameCharsRegex = /^@[a-zA-Z]+$/;

export const simpleStringRegex =
  /^[a-zA-Zа-яА-ЯґҐіІєЄщЩ']+([-']?[a-zA-Zа-яА-ЯґҐіІєЄщЩ']+)\s[a-zA-Zа-яА-ЯґҐіІєЄщЩ']+([-']?[a-zA-Zа-яА-ЯґҐіІєЄщЩ']+)$/;

export const isNickNameCheckingPattern =
  /^@[a-zA-Z'`]+[!@#$%^&*()_+{}|[\]\\:;"'<>,.?/]*$/;

export const replaceSymbolsPattern = /[!@#$%^&*()_+{}|[\]\\:;"'<>,.?/]+$/g;

export const replaceLettersPattern = /^@[a-zA-Z'`]+/g;
