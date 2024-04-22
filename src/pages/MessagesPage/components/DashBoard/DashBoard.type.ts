import { Dispatch, SetStateAction } from "react";
import { RoomType } from "@/src/types";

export type DashBoardProps = {
  setCurrentChat: Dispatch<SetStateAction<null | number>>;
  currentChat: null | number;
  rooms: RoomType[];
};
