import { AxiosResponse } from "axios";

import { isAxiosError } from "axios";

import { SetErrorType } from "@/src/types";
import { EndpointsEnum, api } from "@/src/axios";
import { ILoginPage } from "./LoginForm.type";

// interface LoginApiSuccessResponse {

// }

interface LoginApiErrorResponse {
  errors: {
    password?: string,
    email?: string,
  }
}


const LoginApi = async (values: ILoginPage, setError: SetErrorType) => {
  try {
    const response = await api.post(EndpointsEnum.LOGIN, values);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      setError(error);
      console.log(error.response)
      const newError = error.response as AxiosResponse<LoginApiErrorResponse>
      return newError;
    }
    return null
  }
};

export default LoginApi;
