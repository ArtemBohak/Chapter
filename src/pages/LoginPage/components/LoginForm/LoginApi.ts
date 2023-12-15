import { isAxiosError } from "axios";
import { SetErrorType } from "@/src/types";
import { EndpointsEnum, api } from "@/src/axios";
import { ILoginPage } from "./LoginForm.type";

const LoginApi = async (values: ILoginPage, setError: SetErrorType) => {
  try {
    const response = await api.post(EndpointsEnum.LOGIN, values);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      setError(error);
      return error.response?.data;
    }
  }
};

export default LoginApi;
