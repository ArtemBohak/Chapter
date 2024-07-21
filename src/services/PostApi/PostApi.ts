import { Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { SetIsLoadingType } from "@/src/services";
import { SetErrorType } from "@/src/types";
import { pageLimit, postsCB, commentsPageLimit } from "@/src/utils";

class PostApi<T extends object> {
  private limit: number;
  constructor(
    private setData: Dispatch<SetStateAction<Array<T>>>,
    private setErrorBoundary: SetErrorType,
    private setIsLoading?: SetIsLoadingType,
    private postId?: string | number
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
      : EndpointsEnum.FEEDS;
    const key = this.postId ? "id" : "postId";

    try {
      this.setIsLoading && this.setIsLoading(true);
      const { data } = await api.get(url, {
        params: { page, limit: this.limit },
      });

      this.setData(postsCB<T>(data, key, this.limit));
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

export default PostApi;
