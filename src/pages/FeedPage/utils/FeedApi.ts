import { Dispatch, SetStateAction } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { SetIsLoadingType } from "@/src/services";
import { SetErrorType } from "@/src/types";
import { feedsCB, pageLimit } from "@/src/utils";
import { Feeds } from "../context/FeedProvider.type";

export class FeedApi {
  constructor(
    private setFeeds: Dispatch<SetStateAction<Feeds>>,
    private setIsLoading: SetIsLoadingType,
    private setErrorBoundary: SetErrorType
  ) {}

  async getFeeds(page = 1, limit = pageLimit) {
    try {
      this.setIsLoading(true);
      const { data }: AxiosResponse<Feeds> = await api.get(
        EndpointsEnum.FEEDS,
        {
          params: { page, limit },
        }
      );

      this.setFeeds(feedsCB(data));
    } catch (e) {
      if (e instanceof AxiosError) {
        this.setErrorBoundary(e);
      }
    } finally {
      this.setIsLoading(false);
    }
  }
}
