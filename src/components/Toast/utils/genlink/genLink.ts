import { SocketEvents, links } from "@/src/types";

export const genLink = (eventType: string, id: number | string) => {
  switch (eventType) {
    case SocketEvents.subscribe:
      return `/${id}`;

    case SocketEvents.post:
      return links.FEED;

    default:
      return "/";
  }
};
