import { NavigateFunction } from "react-router-dom";
import { AxiosError, AxiosPromise } from "axios";
import { AppDispatch } from "@/src/redux/store";
import {
  userPending,
  userFulfilled,
  userRejected,
} from "@/src/redux/slices/user";
import {
  accountDeletionTerm,
  apiErrorMsg,
  apiErrorStatus,
  deleteCookie,
  keyValue,
  links,
  setCookie,
  setDataToLS,
  setDate,
  // deleteCookie,
  // setDate,
  // accountDeletionTerm,
} from "@/src/utils";
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
    deleteCookie(
      keyValue.DELETED_ACCOUNT_TIME_STAMP,
      keyValue.RESTORE_EMAIL,
      keyValue.RESTORE_TOKEN
    );
    setDataToLS(cred);
    this.dispatch(userFulfilled(user));
  }

  private handleError(error: string) {
    this.dispatch(userRejected(error));
  }

  protected redirect(user: UserData, url?: string) {
    const redirectUrl = url ? url : `${links.ACCOUNT_CREATION}/${user.id}`;
    const fullName = `${user.firstName ? user.firstName : ""}${
      user.lastName ? ` ${user.lastName}` : ""
    }`;
    setCookie({ email: user.userEmail, userId: user.id + "" }, 604800);
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
        if (error instanceof AxiosError) {
          if (
            error.response?.data.status === apiErrorStatus.FORBIDDEN &&
            error.response?.data.message === apiErrorMsg.ACCOUNT_DELETED
          ) {
            deleteCookie(keyValue.RESTORE_EMAIL);
            setCookie(
              {
                deletedUserDate:
                  setDate(
                    error.response.data.deletedUserDate,
                    accountDeletionTerm
                  ) + "",
                restoreToken: error.response.data.restoreToken,
              },
              setDate(error.response.data.deletedUserDate, accountDeletionTerm)
            );
            return this.navigate(links.RESTORE);
          }
          this.handleError(error.message);
        }
      } finally {
        this.setIsLoading(false);
      }
    };
  }
}

export default OAuthApi;
