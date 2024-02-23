import { Dispatch, SetStateAction } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { SetIsLoadingType } from "@/src/services";
import { SetErrorType } from "@/src/types";
import { commentsCb, feedsCB, pageLimit } from "@/src/utils";
import { CommentsTypes, FeedsTypes } from "./PostApi.type";

class PostApi {
  constructor(
    private setErrorBoundary: SetErrorType,
    private setIsLoading?: SetIsLoadingType,
    private setFeedsData?: Dispatch<SetStateAction<FeedsTypes>>,
    private setCommentsData?: Dispatch<SetStateAction<CommentsTypes>>,
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

      this.setFeedsData && this.setFeedsData(feedsCB(data));
      this.setCommentsData && this.setCommentsData(commentsCb(data));
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
