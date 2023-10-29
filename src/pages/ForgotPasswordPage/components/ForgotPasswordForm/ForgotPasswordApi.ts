import { api, EndpointsEnum } from "@/src/axios";

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
