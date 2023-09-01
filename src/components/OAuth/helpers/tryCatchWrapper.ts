import { type TryCatchWrapperCb, type Data } from "../OAuth.type";

const tryCatchWrapper = (cb: TryCatchWrapperCb) => (data: Data) => {
  try {
    return cb(data);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default tryCatchWrapper;
