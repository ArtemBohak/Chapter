import { Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { SetIsLoadingType } from "@/src/services";
import { SetErrorType } from "@/src/types";
import { pageLimit, commentsPageLimit } from "@/src/utils";
import { SetBoolean } from "../Profile/ProfileProvider.type";
import { DeletePost, setPosts } from "./helpers/setPosts";


class UserPostsLoader<T extends object> {
    private limit: number;
    constructor(
        private url: string,
        private setData: Dispatch<SetStateAction<Array<T>>>,
        private setErrorBoundary: SetErrorType,
        private setIsLoading?: SetIsLoadingType,
        private setIsPostsLoaded?: SetBoolean,
        private postsAction?: "deletePost" | "addPost",
        private postId?: string | number,
    ) {
        this.limit = this.postId ? commentsPageLimit : pageLimit;
    }

    private clearCacheData() {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
    }
    async get(page = 1) {
        const url = this.postId
            ? EndpointsEnum.COMMENTS + "comments/" + this.postId
            : this.url;
        const key = this.postId ? "id" : "postId";

        try {
            this.setIsLoading && this.setIsLoading(true);
            const { data } = await api.get(url, {
                params: { page, limit: this.limit },
            });
            if (this.postsAction === 'addPost') {
                this.setData(setPosts(data, key, this.limit));
            }
            if (this.postsAction === 'deletePost') {
                this.setData(data)
                this.setData(DeletePost(data, key, this.limit))
            }
            this.setData(setPosts(data, key, this.limit));
            this.setIsPostsLoaded && this.setIsPostsLoaded(true)
        } catch (e) {
            if (e instanceof AxiosError) {
                this.setErrorBoundary(e);
            }
        } finally {
            this.setIsLoading && this.setIsLoading(false);
            this.clearCacheData();
        }
    }
}

export default UserPostsLoader;
