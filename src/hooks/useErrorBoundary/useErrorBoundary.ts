import { apiErrorMessage } from "@/src/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useErrorBoundary = (statusValue = 500) => {
  const [error, setError] = useState<AxiosError | string | null>(null);
  useEffect(() => {
    if (error) {
      if (error instanceof AxiosError) {
        if (error.code === apiErrorMessage.CANCELED)
          throw new Error(error.message);

        if (error.response && error.response?.status >= statusValue) {
          throw new Error(error.message);
        }
      }

      if (typeof error === "string") {
        throw new Error(error);
      }
    }
  }, [error, statusValue]);

  return setError;
};
