import { AxiosProgressEvent } from "axios";

let uploadProgress = 0;

export const axiosLoadChecker =
  (controller: AbortController, timeout = 1000 * 10, checkingValue = 3) =>
  ({ progress }: AxiosProgressEvent) => {
    if (typeof progress !== "undefined") {
      uploadProgress = progress;

      setTimeout(() => {
        if (Math.round(uploadProgress * 100) < checkingValue)
          controller.abort();
      }, timeout);
    }
  };
