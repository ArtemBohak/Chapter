import { PostProps } from "../Post.type";

export type PostTitleProps = Required<Pick<PostProps, "title">>;
