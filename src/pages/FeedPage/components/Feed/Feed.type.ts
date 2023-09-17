import { Data } from "../../FeedPage.type";

export type FeedProps = {
  id: string;
  img: string;
  avatar: string;
  text: string;
  postCreatedAt: Date;
  name: string;
  followersList: string[];
  likesList: Data;
  commentsList: Data;
  sharesList: Data;
};

export enum TextSize {
  WORD = 320,
  SENTENCE = 53,
  MOB_SENTENCE = 29,
  MOB_WORD = 200,
}
