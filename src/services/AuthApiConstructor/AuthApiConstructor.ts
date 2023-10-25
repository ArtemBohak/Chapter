import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

import {
  SetIsLoadingType,
  User,
  cbArgs,
  cbFunc,
} from "./AuthApiConstructor.type";
import {
  apiErrorStatus,
  apiErrorMessage,
  LocaleStorageArgs,
  links,
  keysValue,
} from "@/src/types";
import {
  userFulfilled,
  userPending,
  userRejected,
  AppDispatch,
} from "@/src/redux";
import {
  deleteCookie,
  setDataToLS,
  setCookies,
  accountDeletionTerm,
  setDate,
} from "@/src/utils";

export default abstract class AuthApiConstructor {
  constructor(
    protected dispatch: AppDispatch,
    protected token?: string,
    protected setIsLoading?: SetIsLoadingType,
    private navigate?: NavigateFunction
  ) {}

  private handleRequest() {
    this.setIsLoading && this.setIsLoading(true);
    this.dispatch(userPending());
  }

  protected handleData(user: User, cred: LocaleStorageArgs) {
    deleteCookie(
      keysValue.DELETED_ACCOUNT_TIME_STAMP,
      keysValue.RESTORE_EMAIL,
      keysValue.RESTORE_TOKEN
    );
    setDataToLS(cred);
    this.dispatch(userFulfilled(user));
  }

  protected redirect(user: User, url?: string) {
    const redirectUrl = url ? url : `${links.ACCOUNT_CREATION}/${user.id}`;
    const fullName = `${user.firstName ? user.firstName : ""}${
      user.lastName ? ` ${user.lastName}` : ""
    }`;
    setCookies(
      { email: user.userEmail, userId: user.id + "" },
      604800,
      undefined,
      true
    );
    setDataToLS({
      fullName,
    });
    this.navigate && this.navigate(redirectUrl);
  }

  private handleError(error: string) {
    this.dispatch(userRejected(error));
  }

  protected tryCatchWrapper(cb: cbFunc) {
    return async (payload?: cbArgs) => {
      this.handleRequest();
      try {
        await cb(payload);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (
            error.response?.data.status === apiErrorStatus.FORBIDDEN &&
            error.response?.data.message === apiErrorMessage.ACCOUNT_DELETED
          ) {
            deleteCookie(keysValue.RESTORE_EMAIL);

            const expiresDate = setDate(
              error.response.data.deletedUserDate,
              accountDeletionTerm
            );
            const cValue = {
              deletedUserDate: expiresDate + "",
              restoreToken: error.response.data.restoreToken,
            };
            setCookies(cValue, expiresDate, undefined, true);
            if (this.navigate) return this.navigate(links.RESTORE);
          }

          this.handleError(error.message);
          return error;
        }
      } finally {
        this.setIsLoading && this.setIsLoading(false);
      }
    };
  }
}
