import { PostType, SetIsOpenType } from "@/src/types";

export type PostValues = Pick<PostType, "caption" | "title">;

export type CreatePostFormProps = {
  setImage: (value: string) => void,
  setTitle: (value: string) => void,
  setCaption: (value: string) => void,
  setFile: (value: File | null) => void
} & Pick<PostType, "imgUrl" | "title" | "caption"> &
  SetIsOpenType;
