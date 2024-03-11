import { IPost } from "@/src/types";
import { ReactNode } from "react";
import { enemyData } from "../components";

export interface IGuestProviderProps {
  children: ReactNode;
}

export type GuestContextType = {
  fetchEnemyUserData: (Id: string | number | undefined) => Promise<void>;
  guestPostsList: Array<IPost & { id: string | number }> | [];
  enemyData: enemyData;
};
