import { IPost } from "@/src/types";
import { Dispatch, ReactNode } from "react";
import { enemyData } from "../components";

export interface IGuestProviderProps {
  children: ReactNode;
}

export type GuestContextType = {
  fetchEnemyUserData: (Id: string | number | undefined) => Promise<void>;
  guestPostsList: Array<IPost & { id: string | number }> | [];
  enemyData: enemyData;
  setEnemyData: Dispatch<React.SetStateAction<enemyData>>
  BooksCheker: boolean;
};
