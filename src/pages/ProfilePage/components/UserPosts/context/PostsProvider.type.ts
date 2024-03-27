
import { Dispatch, ReactNode, SetStateAction } from "react";
import { PostRefType } from "@/src/types";

export type PostsContextType = {
    userPostsList: [] | Array<PostRefType>;
    setUserPostsList: Dispatch<SetStateAction<Array<PostRefType>>>;
    fetchUserPosts: (currentPage: number) => void;
    userLikedPostsList: [] | Array<PostRefType>;
    setUserLikedPostsList: Dispatch<SetStateAction<Array<PostRefType>>>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    isLoad: boolean;
};

export interface IPostProviderProps {
    children: ReactNode
};
