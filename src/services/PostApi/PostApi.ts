import { Dispatch, SetStateAction } from "react";
import { AxiosError, AxiosResponse } from "axios";
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

  async get(page = 1) {
    try {
      this.setIsLoading && this.setIsLoading(true);

      const { data }: AxiosResponse = await api.get(
        this.postId
          ? EndpointsEnum.COMMENTS + "comments/" + this.postId
          : EndpointsEnum.FEEDS,
        {
          params: { page, limit: this.limit },
        }
      );
      const key = this.postId ? "id" : "postId";
      this.setData(postsCB<T>(data, key));
    } catch (e) {
      if (e instanceof AxiosError) {
        this.setErrorBoundary(e);
      }
    } finally {
      this.setIsLoading && this.setIsLoading(false);
    }
  }
}

export default PostApi;
