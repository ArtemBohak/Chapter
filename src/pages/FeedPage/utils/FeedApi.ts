import { AxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { SetIsLoadingType } from "@/src/services";
import { SetErrorType } from "@/src/types";
import { Dispatch, SetStateAction } from "react";
import { Feeds } from "../context/FeedProvider.type";

export class FeedApi {
  constructor(
    private setFeeds?: Dispatch<SetStateAction<Feeds>>,
    private setIsLoading?: SetIsLoadingType,
    private setErrorBoundary?: SetErrorType // private setPage?: Dispatch<SetStateAction<number>>
  ) {}

  async getFeeds(page = 1, limit = 5) {
    try {
      this.setIsLoading && this.setIsLoading(true);
      const {
        data: { paginatedFeedItems },
      } = await api.get(EndpointsEnum.FEEDS, {
        params: { page, limit },
      });

      this.setFeeds &&
        this.setFeeds((feeds) => [...feeds, ...paginatedFeedItems]);
      // this.setPage && this.setPage((page) => page + 1);
    } catch (e) {
      if (e instanceof AxiosError) {
        this.setErrorBoundary && this.setErrorBoundary(e);
      }
    } finally {
      this.setIsLoading && this.setIsLoading(false);
    }
  }
}
