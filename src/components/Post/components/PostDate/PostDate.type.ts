import { IPost } from "../../Post.type";

export type PostDateProps = Required<Pick<IPost, "createAt">>;
