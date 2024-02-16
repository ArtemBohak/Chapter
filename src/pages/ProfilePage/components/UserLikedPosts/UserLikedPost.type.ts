

export type LikedPostData = {
    postId: number;
    postimage: string;
    title: string;
    caption: string;
    createdDate: string;
    likesCount: number;
    commentCount: number;
    author: {
        authorId: number;
        authorNickName: string;
        authorAvatar: string;
    }
}