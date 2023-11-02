import { FeedActivityProps } from "../../FeedActivity.type";

export type FeedDateProps = Pick<
  FeedActivityProps,
  "date" | "firstName" | "lastName"
>;
