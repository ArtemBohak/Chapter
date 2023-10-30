export enum TextSize {
  WORD = 320,
  SENTENCE = 53,
  MOB_SENTENCE = 29,
  MOB_WORD = 200,
}

export type FeedProps = {
  id: string;
  img: string;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  avatar: string;
  text: string;
  postCreatedAt: Date;
  name: string;
  followersList: string[];
  likesList: string[] | [];
  commentsList: string[] | [];
  sharedList: string[] | [];
};
