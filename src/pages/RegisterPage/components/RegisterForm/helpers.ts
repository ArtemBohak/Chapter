import api from "@/src/axios/api";
import axios from "axios";

import { EndpointsEnum } from "@/src/axios/endpoints.types";
import { type ErrorResponse } from "./RegisterForm.type";

export const fetchNewUserEmail = async (data: { email: string }) => {
  try {
    await api.post(EndpointsEnum.REGISTRATION, {
      email: data.email,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response)
      return (error.response.data as ErrorResponse).status;
  }
};

export const fetchOTPCode = async (data: { hash: string }) => {
  try {
    const response = await api.post(EndpointsEnum.CONFIRM, {
      hash: data.hash,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response)
      return (error.response.data as ErrorResponse).status;
  }
};
