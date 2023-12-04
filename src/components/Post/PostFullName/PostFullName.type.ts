import { PostProps } from "../Post.type";

export type PostFullNameProps = Required<
  Pick<PostProps, "firstName" | "lastName">
>;
