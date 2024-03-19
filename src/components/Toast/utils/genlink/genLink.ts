export const genLink = (id: number | string, postId?: number) => {
  if (postId) return "/post/" + postId;
  return `/${id}`;
};
