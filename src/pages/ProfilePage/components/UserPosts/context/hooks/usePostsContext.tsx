import { createContext, useContext } from "react";
import { PostsContextType } from "../PostsProvider.type";

export const defaultValues = {
    userPostsList: [],
    setUserPostsList: () => { },
    userLikedPostsList: [],
    setUserLikedPostsList: () => { },
    fetchUserPosts: () => { },
};

export const PostsContext = createContext<PostsContextType>(defaultValues);

export const usePostsContext = () => {
    const postsContext = useContext(PostsContext);

    if (!PostsContext)
        throw new Error(
            "useFeedContext has to be used within <FeedContext.Provider>"
        );
    return postsContext;
};