import { SetURLSearchParams, NavigateFunction } from "react-router-dom";
import { AxiosError, AxiosPromise } from "axios";
import { AppDispatch } from "@/src/redux/store";
import {
  oAuthPending,
  oAuthFulfilled,
  oAuthRejected,
} from "@/src/redux/slices/user";
import { links, setDataToLS } from "@/src/utils";
import { UserData } from "./OAuth.type";
import { LocaleStorageArgs } from "@/src/utils/localStorage/localStorage.type";

abstract class OAuthApi {
  constructor(
    protected token: string | undefined,
    private setSearchParams: SetURLSearchParams | undefined,
    private setAuthCode: ((data: string) => void) | undefined,
    private navigate: NavigateFunction,
    private dispatch: AppDispatch,
    private setIsLoading: (data: boolean) => void
  ) {}

  private handleRequest() {
    this.setIsLoading(true);
    this.dispatch(oAuthPending());
  }

  protected handleData(user: UserData, cred: LocaleStorageArgs) {
    this.dispatch(oAuthFulfilled(user));
    setDataToLS(cred);
  }

  private handleError(error: string) {
    this.dispatch(oAuthRejected(error));
  }

  private resetData() {
    this.setIsLoading(false);
    this.setSearchParams && this.setSearchParams("");
    this.setAuthCode && this.setAuthCode("");
  }

  protected redirect(user: UserData, url?: string) {
    const redirectUrl = url ? url : `${links.ACCOUNT_CREATION}/${user.id}`;
    const fullName = `${user.firstName ? user.firstName : ""}${
      user.lastName ? ` ${user.lastName}` : ""
    }`;
    setDataToLS({
      fullName,
    });
    this.navigate(redirectUrl);
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
