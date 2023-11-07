import { PostProps } from "../../../Post.type";

export type PostImageProps = Pick<PostProps, "image" | "id"> &
  Partial<Pick<PostProps, "pageVariant">>;