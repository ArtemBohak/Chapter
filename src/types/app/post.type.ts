import { Dispatch, SetStateAction } from "react";

export type IdList = Array<
  string | number | { [key: string]: [string | number] }
>;

export interface IPost {
  id: string | number;
  avatar: string | null;
  nickName: string;
  imageUrl: string;
  followList: IdList;
  likesList: IdList;
  totalLikes: number;
  totalComments: number;
  date: string | number | Date;
  firstName: string;
  lastName: string;
  title: string;
  caption: string;
}

export type SetIsOpenType = {
  setFormIsOpen: Dispatch<SetStateAction<boolean>>;
};
