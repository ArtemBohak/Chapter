import { Room } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export type ChatProps = {
  // currentChat: null | number;
  setCurrentChat: Dispatch<SetStateAction<null | number>>;
  room: Room;
};
