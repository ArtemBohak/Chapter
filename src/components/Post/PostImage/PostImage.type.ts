import { IPostProps } from "../Post.type";

export type PostImageProps = Required<Pick<IPostProps, "imgUrl">>;
