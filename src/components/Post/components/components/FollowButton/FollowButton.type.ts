import { FeedComponentProps } from "../../FeedComponent/FeedComponent.type";

export type FollowButtonProps = Pick<
  FeedComponentProps,
  "followList" | "id" | "fetchData"
> & {
  classNames?: string;
};
