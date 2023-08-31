import { AxiosResponse, AxiosError, AxiosPromise } from "axios";

import { type Data } from "@/src/types";

export type TryCatchWrapperCb = (
  data: Data
) => AxiosPromise<AxiosResponse | AxiosError>;
