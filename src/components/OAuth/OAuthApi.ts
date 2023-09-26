import { SetURLSearchParams } from "react-router-dom";
import { AxiosError, AxiosPromise } from "axios";

import { AppDispatch } from "@/src/redux/store";
import {
  oAuthPending,
  oAuthFulfilled,
  oAuthRejected,
} from "@/src/redux/slices/user";
import { links, setTokenToLS } from "@/src/utils";
import { ApiData } from "./OAuth.type";

abstract class OAuthApi {
  private url = [links.ACCOUNT_CREATION, links.FEED];

  constructor(
    protected token: string | undefined,
    protected setSearchParams: SetURLSearchParams | undefined,
    protected setAuthCode: ((data: string) => void) | undefined,
    protected navigate: (data: string) => void,
    protected dispatch: AppDispatch,
    protected setIsLoading: (data: boolean) => void
  ) {}

  protected redirect(hasNickName: boolean, id?: number) {
    const [accountCreate, feed] = this.url;
    return hasNickName ? feed : accountCreate + "/" + id;
  }

  protected handleRequest() {
    this.setIsLoading(true);
    this.dispatch(oAuthPending());
  }

  protected handleData({ user, token, tokenExpires }: ApiData) {
    setTokenToLS({
      token,
      tokenExpires,
    });
    this.dispatch(oAuthFulfilled(user));
  }

  protected handleError(error: string) {
    this.dispatch(oAuthRejected(error));
  }

  protected resetData() {
    this.setIsLoading(false);
    this.setSearchParams && this.setSearchParams("");
    this.setAuthCode && this.setAuthCode("");
  }

  protected tryCatchWrapper(cb: () => AxiosPromise) {
    return async () => {
      this.handleRequest();
      try {
        await cb();
      } catch (error) {
        if (error instanceof AxiosError) this.handleError(error.message);
      } finally {
        this.resetData();
      }
    };
  }
}

export default OAuthApi;
