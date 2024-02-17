
export interface UserPostProps {
    post: PostData;
    fetchUserPosts: () => void;
  }

export type PostData = {
    id: number;
    nickName: string;
    imgUrl: string;
    title: string;
    caption: string;
    createdAt: string;
    updatedAt: string;
}