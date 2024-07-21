import { PostRefType, RefsType } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export type GuestPostProps = {
  post: PostRefType;
  setPage?: Dispatch<SetStateAction<number>>;
  setPosts?: Dispatch<SetStateAction<Array<PostRefType>>>;
} & RefsType;


export type PostData = {
  id: number;
  nickName: string;
  imgUrl: string;
  title: string;
  caption: string;
  createdAt: string;
  updatedAt: string;
}