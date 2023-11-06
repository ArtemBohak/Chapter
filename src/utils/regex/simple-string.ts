export const simpleStringRegex =
  /^([^'ʼ][\wа-яА-ЯёЁіІщЩієЄїЇґҐʼ'-]['ʼ$]{2,})+\s+([^'ʼ][\w\sа-яА-ЯёЁіІщЩієЄїЇґҐʼ'-]['ʼ$]{2,})+$/i;

export const latinCharsRegex = /^[a-zA-Z0-9@]+$/;
export const nickNameCharsRegex = /[^@a-zA-Z]/gi;

export const symbolsCharsRegex = /[^,.!:;?)(-/'"_=+*&%$#]/gi;
