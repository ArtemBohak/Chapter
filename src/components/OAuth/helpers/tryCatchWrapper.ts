import { type TryCatchWrapperCb, type ApiData } from "../OAuth.type";

const tryCatchWrapper = (cb: TryCatchWrapperCb) => (data: ApiData) => {
  try {
    return cb(data);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default tryCatchWrapper;
