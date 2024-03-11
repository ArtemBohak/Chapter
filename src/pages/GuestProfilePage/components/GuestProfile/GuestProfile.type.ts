import { IBook } from "@/src/components/BookShelf/Book/BookProps.type";

export type enemyData = {
    id: string;
    nickName: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    userStatus: string | null;
    location: string | null;
    myFollowersCount: number | null;
    myFollowingCount: number | null;
    userBooks: Array<IBook> | [];
    isSubscribed: boolean;
} | undefined;

export default enemyData;