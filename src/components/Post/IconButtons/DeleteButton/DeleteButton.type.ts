import { Dispatch, SetStateAction } from "react";
import { IPost } from "@/src/types";

export type DeleteButtonProps = {
  authorId: string | number;
  commentId: string | number;
  setFeeds?: Dispatch<SetStateAction<Array<IPost>>>;
};
