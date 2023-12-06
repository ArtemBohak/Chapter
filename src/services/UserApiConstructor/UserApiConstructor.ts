import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

import {
  apiErrorStatus,
  apiErrorMessage,
  LocaleStorageArgs,
  links,
  keysValue,
} from "@/src/types";
import {
  userLoading,
  updateUser,
  userError,
  AppDispatch,
  store,
  logoutUser,
} from "@/src/redux";
import {
  deleteCookie,
  setDataToLS,
  setCookies,
  accountDeletionTerm,
  setDate,
} from "@/src/utils";

import {
  SetIsLoadingType,
  User,
  cbArgs,
  cbFunc,
} from "./UserApiConstructor.type";

export default abstract class UserApiConstructor {
  private dispatch: AppDispatch = store.dispatch;
  constructor(
    protected token?: string,
    protected setIsLoading?: SetIsLoadingType,
    private navigate?: NavigateFunction
  ) {}

  private handleRequest() {
    this.setIsLoading && this.setIsLoading(true);
    this.dispatch(userLoading());
  }

  protected redirect(user: User, url?: string) {
    const redirectUrl = url ? url : `${links.ACCOUNT_CREATION}/${user.id}`;
    const fullName = `${user.firstName ? user.firstName : ""}${
      user.lastName ? ` ${user.lastName}` : ""
    }`;

    setCookies(
      { email: user.email, userId: String(user.id) },
      604800,
      undefined,
      true
    );
    setDataToLS({
      fullName,
    });
    this.navigate && this.navigate(redirectUrl);
  }

  protected handleUserData(user: User, cred?: LocaleStorageArgs) {
    if (cred) {
      deleteCookie(
        keysValue.DELETED_ACCOUNT_TIME_STAMP,
        keysValue.RESTORE_EMAIL,
        keysValue.RESTORE_TOKEN,
        keysValue.USER_ID,
        keysValue.EMAIL
      );
      setDataToLS(cred);
    }
    this.dispatch(updateUser(user));
  }

  protected resetUserData() {
    this.dispatch(logoutUser());
    localStorage.clear();
  }

  private handleError(error: string) {
    this.dispatch(userError(error));
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
              deletedUserDate: String(expiresDate),
              restoreToken: error.response.data.restoreToken,
            };
            setCookies(cValue, expiresDate, undefined, true);
            return this.navigate && this.navigate(links.RESTORE);
          }

          this.handleError(
            error.response?.data.error ||
              error.response?.data.message ||
              error.response?.statusText ||
              error.message
          );
          return error;
        }
      } finally {
        this.setIsLoading && this.setIsLoading(false);
      }
    };
  }
}
