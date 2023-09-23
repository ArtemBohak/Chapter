import { SetURLSearchParams } from "react-router-dom";

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
    protected setSearchParams: SetURLSearchParams | null = null,
    protected setAuthCode: ((data: string) => void) | null = null,
    protected navigate: (data: string) => void,
    protected dispatch: AppDispatch,
    protected setIsLoading: (data: boolean) => void
  ) {}

  protected createRedirectUserUrl(hasNickName: boolean, id?: number) {
    const [accountCreate, feed] = this.url;
    return hasNickName ? feed : accountCreate + "/" + id;
  }

  protected pendingData() {
    this.setIsLoading(true);
    this.dispatch(oAuthPending());
  }

  protected saveData({ user, token, tokenExpires }: ApiData) {
    setTokenToLS({
      token,
      tokenExpires,
    });
    this.dispatch(oAuthFulfilled(user));
  }

  protected errorData(error: string) {
    this.dispatch(oAuthRejected(error));
  }

  protected clearData() {
    this.setIsLoading(false);
    this.setSearchParams && this.setSearchParams("");
    this.setAuthCode && this.setAuthCode("");
  }
}

export default OAuthApi;
