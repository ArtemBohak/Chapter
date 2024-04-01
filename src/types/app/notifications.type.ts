import { IUser, RefType } from "..";

export enum SocketEventsEnum {
  subscribe = "subscribeNotification",
  post = "postNotification",
}

export type SocketEventsType =
  | SocketEventsEnum.subscribe
  | SocketEventsEnum.post;

export interface INots {
  id: number;
  isViewed: boolean;
  createdAt: Date;
  data: {
    message: string;
    postId?: number;
    user: Required<
      Pick<IUser, "avatarUrl" | "firstName" | "lastName" | "nickName" | "id">
    >;
  };
}

export interface INotification extends INots {
  nodeRef: RefType;
}
