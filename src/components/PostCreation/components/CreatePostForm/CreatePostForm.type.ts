import { IPost, SetFormIsOpenType } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export type PostValues = Pick<IPost, "text" | "title">;

export type CreatePostFormProps = {
  setImage: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setText: Dispatch<SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<File | null>>;
} & Pick<IPost, "imageUrl" | "title" | "text"> &
  SetFormIsOpenType;
