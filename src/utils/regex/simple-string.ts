export const simpleStringRegex =
  /^([\wа-яА-ЯёЁіІщЩієЄїЇґҐʼ'-]{2,})+\s+([\w\sа-яА-ЯёЁіІщЩієЄїЇґҐʼ'-]{2,})+$/i;

export const latinCharsRegex = /^[a-zA-Z0-9@]+$/;
export const nickNameCharsRegex = /[^@a-zA-Z]/gi;

export const symbolsCharsRegex = /[^,.!:;?)(-/'"_=+*&%$#]/gi;
