import { IPost } from "../../../Post.type";

export type LikesButtonProps = {
  hiddenText?: boolean;
  url: string;
  id: string | number;
  withoutModal?: boolean;
} & Required<Pick<IPost, "userIds">>;
