import { FC, useState } from 'react'
import { PostsContext } from './hooks/usePostsContext';
import { PostData } from '../UserPost.type';
import { PostProviderProps } from './PostsProvider.type';
import { EndpointsEnum, api } from '@/src/axios';
import { LikedPostData } from '../../UserLikedPosts/UserLikedPost.type';

const PostsProvider: FC<PostProviderProps> = ({ children }) => {
    const [userPostsList, setUserPostsList] = useState<[] | PostData[]>([]);
    const [userLikedPostsList, setUserLikedPostsList] = useState<LikedPostData[]>([]);

    const fetchUserPosts = async () => {
        try {
            const response = await api.get(EndpointsEnum.POSTS_BY_AUTHOR);
            if (userLikedPostsList.length < 1) {
                setUserPostsList(response.data);
            }
            return response.data
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };

    return (
        <PostsContext.Provider
            value={{
                userPostsList,
                setUserPostsList,
                userLikedPostsList,
                setUserLikedPostsList,
                fetchUserPosts,
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider