export const simpleStringRegex =
  /^([^ʼ'][\wа-яА-ЯёЁіІщЩієЄїЇґҐʼ'-]{2,})+[^ʼ']+\s+([^ʼ'][\w\sа-яА-ЯёЁіІщЩієЄїЇґҐʼ'-]{2,})+[^ʼ']$/i;

export const latinCharsRegex = /^[a-zA-Z0-9@]+$/;
export const nickNameCharsRegex = /[^@a-zA-Z]/gi;

export const symbolsCharsRegex = /[^,.!:;?)(-/'"_=+*&%$#]/gi;

export const cyrillicPattern = /^[?!,.а-яА-ЯёЁіІщЩієЄїЇґҐ0-9\sʼ'-]+$/i;
