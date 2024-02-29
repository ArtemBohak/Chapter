import { CommentValues } from "@/src/types";

export type LikedPostProps = {
    post: LikedPostData
}


export type LikedPostData = {
    postId: number;
    imgUrl: string;
    title: string;
    caption: string;
    createAt: string;
    updatedAt: string;
    likesCount: number;
    commentsCount: number;
    comments: Array<CommentValues> | [];
    author: {
        id: number;
        nickName: string;
        avatar: string;
        firstName: string;
        lastName: string;
    }
    isSubscribeToAuthor: boolean;
}