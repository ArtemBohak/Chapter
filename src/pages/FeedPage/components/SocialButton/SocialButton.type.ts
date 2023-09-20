import { IconEnum } from "@/src/components";

export enum Title {
  LIKES = "Likes",
  SHARED = "Shared",
  COMMENTS = "Comments",
}

export type SocialButtonProps = {
  userId: string;
  postId: string;
  iconType: IconEnum;
  total: number;
  clickedData: string[] | [];
  title: Title.COMMENTS | Title.LIKES | Title.SHARED;
  size?: number | undefined;
};

export type Data =
  | {
      id: string;
      name: string;
      followList: string[];
      avatar: string;
    }[]
  | [];
