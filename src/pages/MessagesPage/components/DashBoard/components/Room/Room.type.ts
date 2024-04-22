import { IUser } from "@/src/types";

export type RoomProps = {
  active: boolean;
  id: number;
  newMessage: boolean;
  handleClick: (data: number) => void;
} & Partial<IUser>;
