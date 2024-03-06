import { CommentRefType } from "@/src/services/PostApi/PostApi.type";
import { HandleNickname } from "@/src/types";

import { Dispatch, SetStateAction } from "react";

export type CommentsProps = {
  comments: Array<CommentRefType>;
  handleNickname: HandleNickname;
  setPage: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  showAllComments: boolean;
  postId: string | number;
};
