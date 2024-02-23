import { Dispatch, SetStateAction } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { SetIsLoadingType } from "@/src/services";
import { SetErrorType } from "@/src/types";
import { pageLimit, postsCB } from "@/src/utils";
import { CommentType, CommentsType, FeedType, FeedsType } from "./PostApi.type";

class PostApi {
  constructor(
    private setErrorBoundary: SetErrorType,
    private setFeedsData?: Dispatch<SetStateAction<FeedsType>>,
    private setCommentsData?: Dispatch<SetStateAction<CommentsType>>,
    private setIsLoading?: SetIsLoadingType,
    private postId?: string | number,
    private limit = pageLimit
  ) {}

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

      this.setFeedsData && this.setFeedsData(postsCB<FeedType>(data, "postId"));
      this.setCommentsData &&
        this.setCommentsData(postsCB<CommentType>(data, "id"));
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
