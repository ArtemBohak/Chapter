import { api } from "@/src/axios";
import { IdList, SetErrorType } from "@/src/types";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

export const likeApi =
  (url: string) =>
  async (
    id: string | number,
    setUsersId: Dispatch<SetStateAction<IdList>>,
    setErrorBoundary?: SetErrorType
  ) => {
    try {
      const res = await api.post(url + id);
      setUsersId(res.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary && setErrorBoundary(e);
      }
    }
  };
