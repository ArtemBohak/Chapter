import { Dispatch, SetStateAction } from "react";
import { RoomType } from "@/src/types";

export type ChatProps = {
  // currentChat: null | number;
  setCurrentChat: Dispatch<SetStateAction<null | number>>;
  room: RoomType;
};
