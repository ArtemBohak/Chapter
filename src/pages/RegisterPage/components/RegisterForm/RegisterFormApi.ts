import api from "@/src/axios/api";
import { AxiosError } from "axios";

import { EndpointsEnum } from "@/src/axios/endpoints.types";
import { type ApiArgs } from "./RegisterForm.type";

class RegisterFormApi {
  static async fetchUserRegData({ email, hash, setErr }: ApiArgs) {
    try {
      setErr(null);
      if (email) {
        return await api.post(EndpointsEnum.REGISTRATION, {
          email,
        });
      }
      const response = await api.post(EndpointsEnum.CONFIRM, {
        hash,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError && error.response) {
        console.log(
          RegisterFormApi.formatErrorResponse(error.response.data.error)
        );
        return error.response.data;
      }

      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data.error.statusCode >= 500
      ) {
        console.log(error.response);
      }
    }
  }

  static formatErrorResponse(
    message: string,
    index = 1,
    firstDelimiter = ".",
    secondDelimiter = ":"
  ) {
    const [, formattedErrorMessage] = message
      .split(firstDelimiter)
      [index].split(secondDelimiter);

    return formattedErrorMessage.toLowerCase();
  }
}

export default RegisterFormApi;
