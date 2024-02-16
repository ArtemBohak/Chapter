import { PostProps } from "../Post.type";

export type PostImageProps = Required<Pick<PostProps, "imgUrl">>;
