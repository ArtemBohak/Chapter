import { api, EndpointsEnum } from "@/src/axios";

import { IForgotPassword } from "./ForgotPassword.types";
import { isAxiosError } from "axios";
import { SetErrorType } from "@/src/types";

const ForgotPasswordApi = async (
  value: IForgotPassword,
  setError: SetErrorType
) => {
  try {
    const response = await api.post(EndpointsEnum.FORGOT_PASSWORD, value);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      setError(error);
      return error.response?.data;
    }
  }
};

export default ForgotPasswordApi;
