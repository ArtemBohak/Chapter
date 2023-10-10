import { SetURLSearchParams } from "react-router-dom";
import { AxiosError, AxiosPromise } from "axios";

import { AppDispatch } from "@/src/redux/store";
import {
  oAuthPending,
  oAuthFulfilled,
  oAuthRejected,
} from "@/src/redux/slices/user";
import { links, setTokenToLS } from "@/src/utils";
import { UserData } from "./OAuth.type";
import { CredArgs } from "@/src/utils/localStorage/localStorage.type";

abstract class OAuthApi {
  private url = [links.ACCOUNT_CREATION, links.FEED];

  constructor(
    protected token: string | undefined,
    private setSearchParams: SetURLSearchParams | undefined,
    private setAuthCode: ((data: string) => void) | undefined,
    protected navigate: (data: string) => void,
    private dispatch: AppDispatch,
    private setIsLoading: (data: boolean) => void
  ) {}

  private handleRequest() {
    this.setIsLoading(true);
    this.dispatch(oAuthPending());
  }

  protected handleCredentials(cred: CredArgs) {
    setTokenToLS(cred);
  }

  protected handleData(user: UserData) {
    this.dispatch(oAuthFulfilled(user));
  }

  private handleError(error: string) {
    this.dispatch(oAuthRejected(error));
  }

  private resetData() {
    this.setIsLoading(false);
    this.setSearchParams && this.setSearchParams("");
    this.setAuthCode && this.setAuthCode("");
  }

  protected redirect(hasNickName: boolean, id?: number) {
    const [accountCreate, feed] = this.url;
    return hasNickName ? feed : accountCreate + "/" + id;
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
