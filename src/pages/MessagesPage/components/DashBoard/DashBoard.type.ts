import { Dispatch, SetStateAction } from "react";

export type DashBoardProps = {
  setCurrentChat: Dispatch<SetStateAction<null | number>>;
  currentChat: null | number;
};
