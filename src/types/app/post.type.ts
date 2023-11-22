import { Dispatch, SetStateAction } from "react";

export type idList = Array<
  string | number | { [key: string]: [string | number] }
>;

export interface IPost {
  id: string | number;
  avatar: string | null;
  nickName: string;
  image: string;
  followList: idList;
  likesList: idList;
  totalLikes: number;
  totalComments: number;
  date: string | number | Date;
  firstName: string;
  lastName: string;
  title: string;
  text: string;
}

export type SetIsOpen = { setFormIsOpen: Dispatch<SetStateAction<boolean>> };
