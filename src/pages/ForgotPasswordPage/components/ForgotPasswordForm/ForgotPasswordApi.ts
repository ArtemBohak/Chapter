import api from "@/src/axios/api";
import { EndpointsEnum } from "@/src/axios/endpoints.types";
import { IForgotPassword } from "./ForgotPassword.types";
import { isAxiosError } from "axios";

const ForgotPasswordApi = async (value: IForgotPassword) => {

  try {
    const response = await api.post(EndpointsEnum.FORGOT_PASSWORD, value)

    return response;
  } catch (error) {
    if ( isAxiosError(error)) {
   
     return error.response?.data;
    }
   }

};

export default ForgotPasswordApi;
