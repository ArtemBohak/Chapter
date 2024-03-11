import { HandleNickname, CommentRefType } from "@/src/types";

import { Dispatch, SetStateAction } from "react";
import { PostCommentsProps } from "../../PostComments.type";

export type CommentsProps = {
  comments: Array<CommentRefType>;
  showAllComments: boolean;
  postId: string | number;
  handleNickname: HandleNickname;
  setPage: Dispatch<SetStateAction<number>>;
  setAllComments: Dispatch<SetStateAction<Array<CommentRefType>>>;
} & Pick<PostCommentsProps, "setPosts">;
