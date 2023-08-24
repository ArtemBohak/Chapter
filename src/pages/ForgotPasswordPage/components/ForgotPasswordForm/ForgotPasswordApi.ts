import api from "@/src/axios/api";
import { EndpointsEnum } from "@/src/axios/endpoints.types";
import { IForgotPassword } from "./ForgotPassword.types";

const ForgotPasswordApi = (value: IForgotPassword) => {
  api
    .post(EndpointsEnum.FORGOT_PASSWORD, value)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.warn(err);
    });
};

export default ForgotPasswordApi;
