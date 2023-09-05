import api from "@/src/axios/api";
import axios from "axios";

import { EndpointsEnum } from "@/src/axios/endpoints.types";
import { type ErrorResponse, type ApiArgs } from "./RegisterForm.type";

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
      if (axios.isAxiosError(error) && error.response)
        return error.response.data as ErrorResponse;
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
