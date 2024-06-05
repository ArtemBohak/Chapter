import { EndpointsEnum, api } from "@/src/axios";
import { ILoginPage } from "./LoginForm.type";

const LoginApi = async (values: ILoginPage) => {
  return await api.post(EndpointsEnum.LOGIN, values);
};

export default LoginApi;
