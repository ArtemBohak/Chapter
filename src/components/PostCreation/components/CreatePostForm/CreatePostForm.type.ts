import { IPost, SetIsOpen } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export type PostValues = Pick<IPost, "text" | "title">;

export type CreatePostFormProps = {
  setImage: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setText: Dispatch<SetStateAction<string>>;
} & Pick<IPost, "image" | "title" | "text"> &
  SetIsOpen;
