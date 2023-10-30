import { isAxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { ILoginPage } from "./LoginForm.type";

const LoginApi = async (values: ILoginPage) => {
  try {
    const response = await api.post(EndpointsEnum.LOGIN, values);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export default LoginApi;
