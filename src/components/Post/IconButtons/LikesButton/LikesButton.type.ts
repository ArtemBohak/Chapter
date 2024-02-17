import { Dispatch, SetStateAction } from "react";
import { PostProps } from "../../Post.type";
import { IdList, SetErrorType } from "@/src/types";

export type LikesButtonProps = {
  totalLikes?: number;
  hiddenText?: boolean;
} & Required<Pick<PostProps, "userIds">> & {
    id: string | number;
    withoutModal?: boolean;
    likeApi?: (
      id: string | number,
      setUsers: Dispatch<SetStateAction<IdList>>,
      setErrorBoundary?: SetErrorType
    ) => void;
  };
