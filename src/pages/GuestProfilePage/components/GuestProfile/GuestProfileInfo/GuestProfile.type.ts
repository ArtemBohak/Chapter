import { IBook } from "@/src/components/BookShelf/Book/BookProps.type";

export type guestProfileProps = {
    data: {
        id: string | number;
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
    }
    subscribe: () => {};
    subscribeIsLoading: boolean;
}