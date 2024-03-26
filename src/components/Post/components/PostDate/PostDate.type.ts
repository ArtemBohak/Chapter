import { IPost } from "../../Post.type";

export type PostDateProps = { createPost?: boolean } & Required<
  Pick<IPost, "createAt">
>;
