import { IPost } from "@/src/types";

export interface GuestPostProps {
  post: IPost & { id: string | number };
}

export type PostData = {
  id: number;
  nickName: string;
  imgUrl: string;
  title: string;
  caption: string;
  createdAt: string;
  updatedAt: string;
}