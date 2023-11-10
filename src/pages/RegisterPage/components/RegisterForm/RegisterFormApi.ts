import { AxiosError } from "axios";

import { api, EndpointsEnum } from "@/src/axios";

import { type ApiArgs } from "./RegisterForm.type";

class RegisterFormApi {
  static async fetchUserRegData({ email, hash }: ApiArgs) {
    try {
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
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status < 500
      ) {
        return error.response.data;
      } else console.log(error);
    }
  }

  static formatErrorResponse(
    message: string,
    i = 1,
    firstDelimiter = ".",
    secondDelimiter = ":"
  ) {
    const [, formattedErrorMessage] = message
      .split(firstDelimiter)
      // eslint-disable-next-line no-unexpected-multiline
      [i].split(secondDelimiter);

    return formattedErrorMessage.toLowerCase();
  }
}

export default RegisterFormApi;
