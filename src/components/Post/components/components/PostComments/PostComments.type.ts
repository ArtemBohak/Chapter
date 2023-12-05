import { FeedComponentProps } from "../../FeedComponent/FeedComponent.type";

export type PostCommentsProps = Pick<
  FeedComponentProps,
  "id" | "totalComments" | "fetchData"
>;
