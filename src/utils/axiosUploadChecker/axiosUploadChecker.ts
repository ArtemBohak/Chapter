import { AxiosProgressEvent } from "axios";

let uploadProgress = 0;

export const axiosLoadChecker =
  (controller: AbortController, timeout = 1000 * 60, checkingValue = 30) =>
  ({ progress }: AxiosProgressEvent) => {
    if (typeof progress !== "undefined") {
      uploadProgress = progress;
      const t = setTimeout(() => {
        if (Math.round(uploadProgress * 100) < checkingValue) {
          controller.abort();
        }
        return clearTimeout(t);
      }, timeout);
    }
  };
