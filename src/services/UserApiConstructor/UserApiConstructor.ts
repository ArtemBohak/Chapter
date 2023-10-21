import { AppDispatch } from "@/src/redux/store";
import { SetIsLoadingType, UserData } from "./UserApiConstructor.type";
import { userPending, userRejected } from "@/src/redux/slices";
import { AxiosError, AxiosPromise } from "axios";

export default abstract class UserApiConstructor {
  constructor(
    protected dispatch: AppDispatch,
    protected setIsLoading?: SetIsLoadingType
  ) {}

  private handleRequest() {
    this.setIsLoading && this.setIsLoading(true);
    this.dispatch(userPending());
  }

  private handleError(error: string) {
    this.dispatch(userRejected(error));
  }

  protected tryCatchWrapper(
    cb: (payload?: Partial<UserData>) => AxiosPromise<UserData>
  ) {
    return async (payload?: Partial<UserData>) => {
      this.handleRequest();
      try {
        await cb(payload);
      } catch (error) {
        if (error instanceof AxiosError) this.handleError(error.message);
      } finally {
        this.setIsLoading && this.setIsLoading(false);
      }
    };
  }
}
