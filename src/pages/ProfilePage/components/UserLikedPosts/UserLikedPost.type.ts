

export type LikedPostData = {
    postId: number;
    imgUrl: string;
    title: string;
    caption: string;
    createAt: string;
    updatedAt: string;
    likesCount: number;
    commentsCount: number;
    author: {
        id: number;
        nickName: string;
        avatar: string;
        firstName: string;
        lastName: string;
    }
    isSubscribeToAuthor: boolean;
}