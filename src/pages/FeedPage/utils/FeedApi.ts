import { Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { SetIsLoadingType } from "@/src/services";
import { SetErrorType } from "@/src/types";
import { pageLimit } from "@/src/utils";
import { Feeds } from "../context/FeedProvider.type";

const feedsCb = (feedsApiData: Feeds) => (feeds: Feeds) => {
  const result = [...feeds];

  for (const feedData of feedsApiData) {
    const existingObj = result.findIndex((el) => el.postId === feedData.postId);

    if (existingObj !== -1) {
      result[existingObj] = { ...result[existingObj], ...feedData };
    } else result.push(feedData);
  }

  return result;
};

export class FeedApi {
  constructor(
    private setFeeds: Dispatch<SetStateAction<Feeds>>,
    private setIsLoading: SetIsLoadingType,
    private setErrorBoundary: SetErrorType // private setPage: Dispatch<SetStateAction<number>>
  ) {}

  async getFeeds(page = 1, limit = pageLimit) {
    try {
      this.setIsLoading(true);
      const res = await api.get(EndpointsEnum.FEEDS, {
        params: { page, limit },
      });

      const {
        data: { paginatedFeedItems },
      } = res;

      this.setFeeds(feedsCb(paginatedFeedItems));
    } catch (e) {
      if (e instanceof AxiosError) {
        this.setErrorBoundary(e);
      }
    } finally {
      this.setIsLoading(false);
    }
  }
}
