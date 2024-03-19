import { Dispatch, SetStateAction } from "react";
import { PostType, SetIsOpenType } from "@/src/types";

export type PostValues = Pick<PostType, "caption" | "title">;

export type CreatePostFormProps = {
  setImage: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setCaption: Dispatch<SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<File | null>>;
} & Pick<PostType, "imgUrl" | "title" | "caption"> &
  SetIsOpenType;
