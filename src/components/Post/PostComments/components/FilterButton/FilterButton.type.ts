import { Dispatch, SetStateAction } from "react";

export type FilterButtonProps = {
  showAllComments: boolean;
  commentsIsHide?: boolean;
  transitionClassNames: object;
  setShowAllComments: Dispatch<SetStateAction<boolean>>;
};
