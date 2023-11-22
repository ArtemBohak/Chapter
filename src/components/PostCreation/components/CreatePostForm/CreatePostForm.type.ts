import { Dispatch, SetStateAction } from "react";
import { PostProps } from "../../PostCreation.type";

export type PostCreateValues = Pick<PostProps, "comment" | "title">;

export type CreatePostFormProps = {
  setImage: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setComment: Dispatch<SetStateAction<string>>;
} & PostProps;
