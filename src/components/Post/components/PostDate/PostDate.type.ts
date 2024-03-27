import { IPost } from "../../Post.type";

export type PostDateProps = { creatingPost?: boolean } & Required<
  Pick<IPost, "createAt">
>;
