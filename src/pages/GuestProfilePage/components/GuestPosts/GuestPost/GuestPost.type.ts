import { PostRefType } from "@/src/types";

export interface GuestPostProps {
  post: PostRefType;
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