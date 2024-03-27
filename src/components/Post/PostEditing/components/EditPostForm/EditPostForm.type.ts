import { PostRefType, SetIsOpenType } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export type PostValues = Pick<PostRefType, "caption" | "title">;

export type EditPostFormProps = {
  setImage: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setCaption: Dispatch<SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<File | null>>;
} & Pick<PostRefType, "imgUrl" | "title" | "caption"> &
  SetIsOpenType;
