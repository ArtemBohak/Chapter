import { PostProps } from "../Post.type";

export type PostDateProps = Required<Pick<PostProps, "date">>;
