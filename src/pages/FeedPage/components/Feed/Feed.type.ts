export type FeedProps = {
  isFollowing: boolean;
  totalLikes: number;
  totalReposts: number;
  totalComments: number;
  id: string;
  img: string;
  avatar: string;
  text: string;
  likesIdList: string[];
  commentsIdList: string[];
  repostsIdList: string[];
};
