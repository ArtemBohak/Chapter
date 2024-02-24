import { CommentsType } from "@/src/services/PostApi/PostApi.type";

import { Dispatch, SetStateAction } from "react";

export type CommentsProps = {
  comments: CommentsType;
  setId: Dispatch<SetStateAction<number | string | null>>;
  setNickName: Dispatch<SetStateAction<string>>;
  setReplyToUserId: Dispatch<SetStateAction<number | string | null>>;
  setPage: Dispatch<SetStateAction<number>>;
  showAllComments: boolean;
  postId: string | number;
};
