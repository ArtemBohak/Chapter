import { PostProps } from "../../Post.type";

export type LikesButtonProps = {
  totalLikes?: number;
  hiddenText?: boolean;
  url: string;
} & Required<Pick<PostProps, "userIds">> & {
    id: string | number;
    withoutModal?: boolean;
  };
