import { PostActivityProps } from "../../PostActivity.type";

export type PostDateProps = Pick<
  PostActivityProps,
  "date" | "firstName" | "lastName"
>;
