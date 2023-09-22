import { SetURLSearchParams } from "react-router-dom";

import { AppDispatch } from "@/src/redux/store";
import {
  oAuthPending,
  oAuthFulfilled,
  oAuthRejected,
} from "@/src/redux/slices/user";
import { links, setTokenToLS } from "@/src/utils";
import { ApiData, OAuthApiArgs } from "./OAuth.type";

abstract class OAuthApi {
  private url = [links.ACCOUNT_CREATION, links.FEED];
  protected token: string | undefined;
  protected setSearchParams: SetURLSearchParams | null;
  protected setAuthCode: ((data: string) => void) | null;
  protected navigate: (data: string) => void;
  protected dispatch: AppDispatch;
  protected setIsLoading: (data: boolean) => void;

  constructor({
    token,
    setSearchParams = null,
    setAuthCode = null,
    navigate,
    dispatch,
    setIsLoading,
  }: OAuthApiArgs) {
    this.token = token;
    this.setSearchParams = setSearchParams;
    this.setAuthCode = setAuthCode;
    this.navigate = navigate;
    this.dispatch = dispatch;
    this.setIsLoading = setIsLoading;
  }

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
