import { SocketMessage, links } from "@/src/types";

export const genLink = (message: string, id: number | string) => {
  if (message === SocketMessage.newPost) return links.FEED;
  return `/${id}`;
};
