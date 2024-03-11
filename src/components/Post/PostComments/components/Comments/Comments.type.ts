import { HandleNickname, CommentRefType } from "@/src/types";

import { Dispatch, SetStateAction } from "react";
import { PostCommentsProps } from "../../PostComments.type";

export type CommentsProps = {
  comments: Array<CommentRefType>;
  handleNickname: HandleNickname;
  setPage: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  showAllComments: boolean;
  postId: string | number;
} & Pick<PostCommentsProps, "setPosts">;
