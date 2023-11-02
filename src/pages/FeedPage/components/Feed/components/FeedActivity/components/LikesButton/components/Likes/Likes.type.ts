import { idList } from "@/src/types";

export interface Like {
  avatar: string | null;
  firstName: string;
  lastName: string;
  id: number | string;
  likesList: idList;
}

export type LikesProps = {
  likesData: Like[];
};
