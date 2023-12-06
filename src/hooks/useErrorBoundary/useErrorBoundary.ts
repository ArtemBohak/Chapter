import { apiErrorMessage } from "@/src/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { UseErrorBoundaryArgs } from "./useErrorBoundary.type";

export const useErrorBoundary = ({
  statusValue = 500,
  additionalStatusValue,
  messageValues = [],
}: UseErrorBoundaryArgs = {}) => {
  const [error, setError] = useState<AxiosError | string | null>(null);
  useEffect(() => {
    if (error) {
      if (error instanceof AxiosError) {
        if (error.code === apiErrorMessage.CANCELED)
          throw new Error(error.message);

        if (error.response && error.response?.status >= statusValue)
          throw new Error(error.message);

        if (
          error.response &&
          additionalStatusValue &&
          error.response?.status === additionalStatusValue
        )
          throw new Error(error.message);
      }
    }
  }, [error, statusValue, additionalStatusValue]);

  useEffect(() => {
    if (error) {
      if (typeof error === "string") {
        messageValues.forEach((i) => {
          if (i === error) throw new Error(error);
        });
      }
    }
  }, [error, messageValues]);

  return setError;
};
