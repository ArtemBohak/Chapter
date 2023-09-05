import api from "@/src/axios/api";
import axios from "axios";

import { EndpointsEnum } from "@/src/axios/endpoints.types";
import { type ErrorResponse, type ApiArgs } from "./RegisterForm.type";

class RegisterFormApi {
  static async fetchNewUserEmail({ email }: { email: string }) {
    try {
      await api.post(EndpointsEnum.REGISTRATION, {
        email,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)
        return error.response.data as ErrorResponse;
    }
  }

  static async fetchOTPCode({ hash }: { hash: string }) {
    try {
      const response = await api.post(EndpointsEnum.CONFIRM, {
        hash,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response)
        return error.response.data as ErrorResponse;
    }
  }

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
      console.log(error);
      if (axios.isAxiosError(error) && error.response)
        return error.response.data as ErrorResponse;
    }
  }
}

export default RegisterFormApi;
