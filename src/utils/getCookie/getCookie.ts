export const getCookieByName = (name: string): string | null => {
  if (!document.cookie) return null;

  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  return value || null;
};
