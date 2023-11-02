import { idList } from "@/src/types";

export type Feed = {
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
};
