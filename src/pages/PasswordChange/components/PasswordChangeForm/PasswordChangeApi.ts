import api from "@/src/axios/api";
import { EndpointsEnum } from "@/src/axios/endpoints.types";
import { isAxiosError } from "axios";
import { ApiArgs } from "./PasswordChange.type";

const PasswordChangeApi = async ({ password, hash }: ApiArgs) => {
  try {
    const response = await api.post(EndpointsEnum.RESET_PASSWORD, {
      password,
      hash,
    });

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export default PasswordChangeApi;
