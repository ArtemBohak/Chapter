
import { Dispatch, ReactNode } from "react";
import { PostData } from "../UserPost.type";
import { LikedPostData } from "@/src/pages/ProfilePage/components/UserLikedPosts/UserLikedPost.type";

export type PostsContextType = {
    userPostsList: [] | PostData[];
    setUserPostsList: Dispatch<React.SetStateAction<PostData[]>>
    fetchUserPosts: () => void;
    userLikedPostsList: [] | LikedPostData[]
    setUserLikedPostsList: Dispatch<React.SetStateAction<LikedPostData[]>>
};

export type PostProviderProps = {
    children: ReactNode
} & Partial<PostsContextType>;
