export const nickNameCharsRegex = /^@[a-zA-Z0-9]+$/;

export const simpleStringRegex =
  /^[a-zA-Zа-яА-ЯґҐіІєЄщЩ']+([-']?[a-zA-Zа-яА-ЯґҐіІєЄщЩ']+)\s[a-zA-Zа-яА-ЯґҐіІєЄщЩ']+([-']?[a-zA-Zа-яА-ЯґҐіІєЄщЩ']+)$/;

export const isNickNameCheckingPattern =
  /^@[a-zA-Z'`]+[!@#$%^&*()_+{}|[\]\\:;"'<>,.?/]*$/;

export const replaceSymbolsPattern = /[!@#$%^&*()_+{}|[\]\\:;"'<>,.?/]+$/g;

export const replaceLettersPattern = /^@[a-zA-Z'`]+/g;

export const stringRegex = /^[a-zA-Zа-яА-ЯґҐіІєЄщЩ0-9:]+$/;
