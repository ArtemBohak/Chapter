export const nickNameCharsRegex = /^@[a-zA-Z]+$/;

export const symbolsCharsRegex = /[^,.!:;?)(-/'"_=+*&%$#]/gi;

export const cyrillicPattern = /^[?!,.а-яА-ЯёЁіІщЩієЄїЇґҐ0-9\sʼ'-]+$/i;

export const simpleStringRegex =
  /^(?:[a-zA-ZґҐіІєЄщЩ\u0400-\u04FF]+(?:['ʼ\s]*[a-zA-Z\u0400-\u04FF]+)*)+$/;
