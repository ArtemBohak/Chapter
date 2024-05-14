import { CommentType, PostRefType, RefsType } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export type LikedPostProps = {
    post: PostRefType;
    setPage?: Dispatch<SetStateAction<number>>;
    setPosts?: Dispatch<SetStateAction<Array<PostRefType>>>;
} & RefsType;


export type LikedPostData = {
    postId: string | number;
    imgUrl: string | null;
    title: string | null;
    caption: string | null;
    createAt: string | number | Date;
    updatedAt: string | number | Date;
    commentsCount: number;
    comments: Array<CommentType> | [];
    userIds: number[]
    author: {
        id: number;
        nickName: string;
        avatar: string;
        firstName: string;
        lastName: string;
    }
    isSubscribeToAuthor: boolean;
}