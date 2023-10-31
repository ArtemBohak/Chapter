import { idList } from "@/src/types";

export interface IFeedProps {
  avatar: string | null;
  nickName: string;
  followList: idList;
  image: string;
  likesList: idList;
  likesValue: number;
  commentsValue: number;
}
