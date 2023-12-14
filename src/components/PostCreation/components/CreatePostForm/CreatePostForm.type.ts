import { IPost, SetIsOpenType } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export type PostValues = Pick<IPost, "caption" | "title">;

export type CreatePostFormProps = {
  setImage: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setCaption: Dispatch<SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<File | null>>;
} & Pick<IPost, "imageUrl" | "title" | "caption"> &
  SetIsOpenType;
