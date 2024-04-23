import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

export type SetErrorType = Dispatch<
  SetStateAction<AxiosError | Error | null | string>
>;
