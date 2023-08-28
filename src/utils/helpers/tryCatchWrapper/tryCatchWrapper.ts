import { type TryCatchWrapperCb } from "./tryCatchWrapper.type";

import { type Data } from "@/src/types";

const tryCatchWrapper = (cb: TryCatchWrapperCb) => (data: Data) => {
  try {
    return cb(data);
  } catch (error) {
    console.log(error);
  }
};

export { tryCatchWrapper };
