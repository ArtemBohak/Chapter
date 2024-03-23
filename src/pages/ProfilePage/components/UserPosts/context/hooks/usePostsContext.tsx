import { createContext, useContext } from "react";
import { PostsContextType } from "../PostsProvider.type";


export const PostsContext = createContext<PostsContextType | null>(null);

export const usePostsContext = () => {
    const postsContext = useContext(PostsContext);

    if (!postsContext)
        throw new Error(
            "usePostContext has to be used within <PostContext.Provider>"
        );
    return postsContext;
};