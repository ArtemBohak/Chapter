import { AxiosResponse } from "axios";

import { type Data } from "@/src/types";

export type TryCatchWrapperCb = (data: Data) => Promise<AxiosResponse>;
