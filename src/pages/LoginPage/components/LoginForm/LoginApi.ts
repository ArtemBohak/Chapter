import api from "@/src/axios/api";
import { EndpointsEnum } from "@/src/axios/endpoints.types";
import { ILoginPage } from "./LoginForm.type";
import { isAxiosError } from "axios";

const LoginApi = async (values: ILoginPage, ) => {
  try {
    const response = await api.post(EndpointsEnum.LOGIN, values);
  console.log(response)
    return response;

  } catch (error) {
   if ( isAxiosError(error)) {
  
    return error.response?.data;
   }
  }
};

export default LoginApi;
