import api from "@/src/axios/api";
import { EndpointsEnum } from "@/src/axios/endpoints.types";
import { ILoginPage } from "./LoginForm.types";

const LoginApi = (values: ILoginPage) => {
  api
    .post(EndpointsEnum.LOGIN, values)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.response.data.status);
      if (err.response.data.status === 422) {
        alert("wrong email or password");
      }
    });
};

export default LoginApi;
