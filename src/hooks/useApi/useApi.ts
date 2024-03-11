import { AxiosError } from "axios";
import { useErrorBoundary } from "..";
import { ApiCBType, CBType } from "./useApi.type";

export const useApiCB = (
  apiCB: ApiCBType,
  errorCB?: CBType,
  finallyCB?: CBType
) => {
  const setErrorBoundary = useErrorBoundary();

  return async () => {
    try {
      await apiCB();
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);

        errorCB && errorCB();
      }
    } finally {
      finallyCB && finallyCB();
    }
  };
};
