import { FeedComponentProps } from "../../../FeedComponent/FeedComponent.type";

export type LikesButtonProps = { hiddenText?: boolean } & Pick<
  FeedComponentProps,
  "likesList" | "totalLikes" | "id" | "fetchData"
>;
