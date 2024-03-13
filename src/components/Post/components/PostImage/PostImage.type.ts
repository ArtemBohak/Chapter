import { IPost } from "../../Post.type";

export type PostImageProps = Required<Pick<IPost, "imgUrl">>;
