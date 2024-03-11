export const genLink = (id: number | string, postId: number | null) => {
  if (postId) return "/post/" + postId;
  return `/${id}`;
};
