import { FC, useState } from 'react'
import { PostsContext } from './hooks/usePostsContext';
import { IPostProviderProps } from './PostsProvider.type';
import { EndpointsEnum, api } from '@/src/axios';
import { PostRefType } from '@/src/types';

const PostsProvider: FC<IPostProviderProps> = ({ children }) => {
    const [userPostsList, setUserPostsList] = useState<Array<PostRefType>>([]);
    const [userLikedPostsList, setUserLikedPostsList] = useState<Array<PostRefType>>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoad, setIsLoad] = useState(false);


    const fetchUserPosts = async (currentPage: number) => {
        try {
            const response = await api.get(`${EndpointsEnum.POSTS_BY_AUTHOR}?page=${currentPage}&limit=3`);
            setUserPostsList(response.data);
            setIsLoad(true)
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
                page,
                setPage,
                isLoad,
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider