export type FeedProps = {
  totalLikes: number;
  totalRepost: number;
  totalComments: number;
  id: string;
  img: string;
  avatar: string;
  text: string;
  postCreatedAt: Date;
  name: string;
  followIdList: string[];
  likesIdList: string[];
  commentsIdList: string[];
  repostIdList: string[];
};

export enum TextSize {
  WORD = 320,
  SENTENCE = 53,
}
