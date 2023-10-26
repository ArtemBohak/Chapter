import { api, EndpointsEnum } from "@/src/axios";

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
