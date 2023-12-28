import { AxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { SetIsLoadingType } from "@/src/services";
import { SetErrorType } from "@/src/types";
import { Dispatch, SetStateAction } from "react";
import { Feeds } from "../context/FeedProvider.type";

export class FeedApi {
  private page: number = 1;
  private limit: number = 10;
  constructor(
    private setFeeds?: Dispatch<SetStateAction<Feeds>>,
    private setIsLoading?: SetIsLoadingType,
    private setErrorBoundary?: SetErrorType
  ) {}

  async getFeeds(page = this.page, limit = this.limit) {
    try {
      this.setIsLoading && this.setIsLoading(true);
      const {
        data: { paginatedFeedItems },
      } = await api.get(EndpointsEnum.FEEDS, {
        params: { page, limit },
      });

      this.setFeeds && this.setFeeds(paginatedFeedItems);
    } catch (e) {
      if (e instanceof AxiosError) {
        this.setErrorBoundary && this.setErrorBoundary(e);
      }
    } finally {
      this.setIsLoading && this.setIsLoading(false);
    }
  }
}
