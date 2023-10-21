import { NavigateFunction } from "react-router-dom";
import { AxiosError, AxiosPromise } from "axios";
import { AppDispatch } from "@/src/redux/store";
import {
  userPending,
  userFulfilled,
  userRejected,
} from "@/src/redux/slices/user";
import { links, setDataToLS } from "@/src/utils";
import { SetIsLoadingType, UserData } from "./OAuth.type";
import { LocaleStorageArgs } from "@/src/utils/localStorage/localStorage.type";

abstract class OAuthApi {
  constructor(
    protected token: string | undefined,
    private navigate: NavigateFunction,
    private dispatch: AppDispatch,
    private setIsLoading: SetIsLoadingType
  ) {}

  private handleRequest() {
    this.setIsLoading(true);
    this.dispatch(userPending());
  }

  protected handleData(user: UserData, cred: LocaleStorageArgs) {
    this.dispatch(userFulfilled(user));
    setDataToLS(cred);
  }

  private handleError(error: string) {
    this.dispatch(userRejected(error));
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

  protected tryCatchWrapper(cb: () => AxiosPromise<UserData>) {
    return async () => {
      this.handleRequest();
      try {
        await cb();
      } catch (error) {
        if (error instanceof AxiosError) this.handleError(error.message);
      } finally {
        this.setIsLoading(false);
      }
    };
  }
}

export default OAuthApi;
